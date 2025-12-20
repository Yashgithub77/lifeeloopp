# Fix for NextAuth ClientFetchError

## What was the problem?
The error "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" occurs when NextAuth.js returns an HTML error page instead of JSON. This typically happens when:

1. The `AUTH_SECRET` environment variable is missing
2. The `SessionProvider` doesn't know where to find the auth API routes

## What was fixed?

### 1. Added `basePath` to SessionProvider
Updated `src/app/ClientLayout.tsx` to include `basePath="/api/auth"` in the SessionProvider.

### 2. Added `AUTH_SECRET` to auth config
Updated `src/auth.ts` to use `AUTH_SECRET` from environment variables.

### 3. Better error handling
Made the database operations optional so auth doesn't fail if the database is unavailable.

## Next Steps - YOU NEED TO DO THIS:

### Add AUTH_SECRET to your .env file

1. Generate a random secret by running this command in your terminal:

**Windows PowerShell:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**OR use this online:**
```
https://generate-secret.vercel.app/32
```

2. Copy the generated string (it will be a long random string like: `a1b2c3d4e5f6...`)

3. Add it to your `.env` file:
```
AUTH_SECRET="your-generated-secret-here"
```

### Example .env file should have:
```
AUTH_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
DATABASE_URL="your-database-url"
GEMINI_API_KEY="your-gemini-key"
```

## After adding AUTH_SECRET:

The dev server should automatically reload, and the error should be gone!

If the error persists, try:
1. Stop the dev server (Ctrl+C)
2. Restart it with `npm run dev`
