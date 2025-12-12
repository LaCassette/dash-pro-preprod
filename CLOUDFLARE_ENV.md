# Cloudflare Environment Variables

The following secrets need to be configured in Cloudflare via:
```bash
wrangler secret put <SECRET_NAME>
```

## Required Secrets

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@host/db` |
| `AUTH0_SECRET` | Session secret (32+ chars) | `openssl rand -hex 32` |
| `AUTH0_DOMAIN` | Auth0 domain | `cassette.eu.auth0.com` |
| `AUTH0_CLIENT_ID` | Auth0 client ID | `2oKmyUTrYd7kdFSro4RjHxGQ4udsWV46` |
| `AUTH0_CLIENT_SECRET` | Auth0 client secret | (from Auth0 Dashboard) |
| `APP_BASE_URL` | Dashboard URL | `https://app.atletia.fit` |
| `STRIPE_SECRET_KEY` | Stripe API key | `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `ENCRYPTION_SECRET` | Profile encryption key | `openssl rand -hex 32` |

## Deployment Commands

```bash
# Login to Cloudflare
wrangler login

# Set all secrets
wrangler secret put DATABASE_URL
wrangler secret put AUTH0_SECRET
wrangler secret put AUTH0_DOMAIN
wrangler secret put AUTH0_CLIENT_ID
wrangler secret put AUTH0_CLIENT_SECRET
wrangler secret put APP_BASE_URL
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_PUBLISHABLE_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put ENCRYPTION_SECRET

# Deploy
npm run deploy
```
