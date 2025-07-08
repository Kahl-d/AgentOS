# Backend Deployment Guide for Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install with `npm i -g vercel`
3. **Environment Variables**: Set up your API keys

## Environment Variables Setup

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
PUSHOVER_TOKEN=your_pushover_token_here (optional)
PUSHOVER_USER=your_pushover_user_here (optional)
```

### Local Development:
1. Copy `env.example` to `.env`
2. Fill in your actual API keys
3. Never commit `.env` files to git

## Deployment Steps

### Option 1: Using Vercel CLI
```bash
cd backend
vercel login
vercel
```

### Option 2: Using Vercel Dashboard
1. Connect your GitHub repository
2. Set the root directory to `backend`
3. Deploy

## Configuration Files

- `vercel.json`: Vercel configuration
- `requirements.txt`: Python dependencies
- `main.py`: FastAPI application entry point

## API Endpoints

- `GET /`: Health check
- `POST /api/ask`: Chat with AI bot

## CORS Configuration

The backend is configured to allow CORS from any origin for development. For production, you should restrict this to your frontend domain.

## Troubleshooting

1. **Function timeout**: Check `vercel.json` maxDuration setting
2. **Import errors**: Ensure all dependencies are in `requirements.txt`
3. **Environment variables**: Verify they're set in Vercel dashboard

## Security Notes

- ✅ API keys are stored as environment variables
- ✅ `.env` files are gitignored
- ✅ PDF files are gitignored (may contain sensitive data)
- ⚠️ CORS is currently open - restrict for production 