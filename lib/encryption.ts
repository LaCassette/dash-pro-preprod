/**
 * Web Crypto API-based encryption library for Edge Runtime compatibility
 * Uses AES-256-GCM encryption compatible with Cloudflare Workers
 */

const ALGORITHM = 'AES-GCM';
const IV_LENGTH = 16; // 128 bits for GCM
const KEY_LENGTH = 32; // 256 bits for AES-256
const TAG_LENGTH = 16; // 128 bits for GCM auth tag
const SALT = 'salt'; // Same salt as in the original implementation

/**
 * Derives a cryptographic key from a password using PBKDF2
 * This replaces crypto.scryptSync from the Node.js implementation
 */
async function deriveKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();

  // Import the secret as a key
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive the encryption key using PBKDF2
  // Using parameters that approximate scrypt's security level
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(SALT),
      iterations: 100000, // High iteration count for security
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH * 8 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts a string using AES-256-GCM
 * Format: Base64(IV + AuthTag + EncryptedData)
 * 
 * @param text - The plaintext to encrypt
 * @returns Base64-encoded encrypted data
 */
export async function encrypt(text: string): Promise<string> {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error('ENCRYPTION_SECRET environment variable is not set');
  }

  try {
    const encoder = new TextEncoder();
    const key = await deriveKey(secret);

    // Generate a random IV
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

    // Encrypt the data
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv: iv,
        tagLength: TAG_LENGTH * 8, // in bits
      },
      key,
      encoder.encode(text)
    );

    // The encrypted buffer contains: EncryptedData + AuthTag (appended by GCM)
    const encrypted = new Uint8Array(encryptedBuffer);

    // Split the auth tag from the encrypted data
    const ciphertext = encrypted.slice(0, encrypted.length - TAG_LENGTH);
    const authTag = encrypted.slice(encrypted.length - TAG_LENGTH);

    // Combine: IV + AuthTag + EncryptedData (to match the original format)
    const combined = new Uint8Array(IV_LENGTH + TAG_LENGTH + ciphertext.length);
    combined.set(iv, 0);
    combined.set(authTag, IV_LENGTH);
    combined.set(ciphertext, IV_LENGTH + TAG_LENGTH);

    // Return as Base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts a string encrypted with the encrypt function
 * Expects format: Base64(IV + AuthTag + EncryptedData)
 * 
 * @param encryptedData - Base64-encoded encrypted data
 * @returns Decrypted plaintext or null if decryption fails (legacy format)
 */
export async function decrypt(encryptedData: string): Promise<string | null> {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error('ENCRYPTION_SECRET environment variable is not set');
  }

  if (!encryptedData) return '';

  try {
    const key = await deriveKey(secret);

    // Decode from Base64
    const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

    // Verify minimum length
    if (combined.length < IV_LENGTH + TAG_LENGTH) {
      throw new Error('Data too short');
    }

    // Extract components: IV + AuthTag + EncryptedData
    const iv = combined.slice(0, IV_LENGTH);
    const authTag = combined.slice(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const ciphertext = combined.slice(IV_LENGTH + TAG_LENGTH);

    // Recombine ciphertext and auth tag for decryption (GCM expects them together)
    const encryptedBuffer = new Uint8Array(ciphertext.length + authTag.length);
    encryptedBuffer.set(ciphertext, 0);
    encryptedBuffer.set(authTag, ciphertext.length);

    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv,
        tagLength: TAG_LENGTH * 8,
      },
      key,
      encryptedBuffer
    );

    // Convert to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    // Return null for legacy encrypted messages that can't be decrypted
    // This prevents console flooding when old messages exist
    return null;
  }
}

/**
 * Encrypts a JSON object
 * 
 * @param obj - The object to encrypt
 * @returns Base64-encoded encrypted data
 */
export async function encryptObject<T>(obj: T): Promise<string> {
  return encrypt(JSON.stringify(obj));
}

/**
 * Decrypts a JSON object
 * 
 * @param encryptedData - Base64-encoded encrypted data
 * @returns Decrypted object or null if decryption fails
 */
export async function decryptObject<T>(encryptedData: string): Promise<T | null> {
  const decrypted = await decrypt(encryptedData);
  if (decrypted === null) return null;
  try {
    return JSON.parse(decrypted) as T;
  } catch {
    return decrypted as unknown as T;
  }
}
