# How to Fix Your .env File

## 🔴 Current Problem

Your `.env` file has **formatting issues** that are causing the server configuration error:

1. **Duplicate AUTH_SECRET entries** - You have it listed twice
2. **Line breaks in the middle of values** - Environment variables are split across multiple lines
3. This breaks the server configuration and causes authentication to fail

## ✅ How to Fix It

Open your `.env` file and make sure it looks like this (all on single lines):

```
DATABASE_URL="postgresql://postgres.kwhbreznqwexpjleavsn:H4eGc5P6Xpt8obJK@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
GOOGLE_CLIENT_ID="402983693xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
AUTH_SECRET="af52ef15f33d12421f70f7b83f75418a7a24754bf48e92eac8c65706b11"
GEMINI_API_KEY="AIzaSyAGJMkBJakCKTOqiJ7r9K8hWVxGAoYy20g"
```

## 📋 Rules for .env Files

1. ✅ Each variable on **ONE single line**
2. ✅ No line breaks in the middle of values
3. ✅ No duplicate variable names
4. ✅ Values with spaces or special chars should be in quotes
5. ❌ No spaces around `=` (optional but cleaner)

## 🛠️ Step-by-Step Fix

1. **Open** `c:\Users\ADMIN\.gemini\antigravity\scratch\lifeloop\.env`
2. **Find** any variables that are split across multiple lines
3. **Join** them into single lines
4. **Remove** the duplicate `AUTH_SECRET` entry
5. **Save** the file
6. The dev server will automatically reload ✨

After fixing, your application should work without the "Server error" message!
