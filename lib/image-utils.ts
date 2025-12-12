/**
 * Valide si une chaîne est une URL d'image base64 valide
 */
export function isValidBase64Image(logo: string | null | undefined): boolean {
  if (!logo || typeof logo !== 'string') {
    return false;
  }

  // Vérifier que la chaîne commence par data:image/
  if (!logo.startsWith('data:image/')) {
    return false;
  }

  // Vérifier qu'il y a une virgule (séparateur entre le header et les données)
  const commaIndex = logo.indexOf(',');
  if (commaIndex === -1) {
    return false;
  }

  // Vérifier que les données base64 existent après la virgule
  const base64Data = logo.substring(commaIndex + 1);
  if (base64Data.length === 0) {
    return false;
  }

  // Vérifier que les données base64 sont valides (optionnel, mais recommandé)
  try {
    // Tenter de décoder une petite partie pour vérifier que c'est valide
    if (base64Data.length > 0) {
      atob(base64Data.substring(0, Math.min(100, base64Data.length)));
    }
  } catch (e) {
    return false;
  }

  return true;
}

/**
 * Retourne l'URL de l'image si elle est valide, sinon null
 */
export function getValidImageUrl(logo: string | null | undefined): string | null {
  if (isValidBase64Image(logo)) {
    return logo as string;
  }
  return null;
}

