# Portfolio OS Website - Deployment Guide

This guide covers deploying both the frontend and backend of the Portfolio OS Website to Vercel.

## Project Structure

```
os/
├── frontend/          # React app (deploy to Vercel)
├── backend/           # FastAPI app (deploy to Vercel)
└── README.md
```

## Backend Deployment (FastAPI)

### 1. Environment Variables Setup

In your Vercel project settings, add these environment variables:

```
OPENAI_API_KEY=your_openai_api_key_here
PUSHOVER_TOKEN=your_pushover_token_here (optional)
PUSHOVER_USER=your_pushover_user_here (optional)
```

### 2. Deploy Backend

```bash
cd backend
vercel login
vercel
```

**Important**: Set the root directory to `backend` when prompted.

### 3. Get Backend URL

After deployment, note your backend URL (e.g., `https://your-backend.vercel.app`)

## Frontend Deployment (React)

### 1. Environment Variables Setup

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
cp env.example .env
```

Edit `.env` and set your backend URL:

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

### 2. Deploy Frontend

```bash
cd frontend
vercel login
vercel
```

**Important**: Set the root directory to `frontend` when prompted.

## Security Checklist

### ✅ Backend Security
- [ ] API keys stored as environment variables
- [ ] `.env` files gitignored
- [ ] PDF files gitignored (may contain sensitive data)
- [ ] Dependencies pinned to specific versions

### ✅ Frontend Security
- [ ] API URL configurable via environment variables
- [ ] No hardcoded API keys in frontend code
- [ ] Environment files gitignored

### ⚠️ Production Considerations
- [ ] Restrict CORS to your frontend domain
- [ ] Add rate limiting to API endpoints
- [ ] Consider adding authentication if needed

## Configuration Files

### Backend (`backend/`)
- `vercel.json` - Vercel configuration
- `requirements.txt` - Python dependencies
- `main.py` - FastAPI application
- `env.example` - Environment variables template

### Frontend (`frontend/`)
- `src/config.js` - API configuration
- `env.example` - Environment variables template
- `vite.config.js` - Vite configuration

## API Endpoints

- `GET /` - Health check
- `POST /api/ask` - Chat with AI bot

## Troubleshooting

### Backend Issues
1. **Function timeout**: Check `vercel.json` maxDuration (currently 30s)
2. **Import errors**: Verify all dependencies in `requirements.txt`
3. **Environment variables**: Check Vercel dashboard settings

### Frontend Issues
1. **API calls failing**: Verify `VITE_API_BASE_URL` is set correctly
2. **Build errors**: Check for missing dependencies
3. **CORS errors**: Ensure backend CORS allows your frontend domain

## Local Development

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Monitoring

- Check Vercel function logs for backend issues
- Monitor API response times
- Set up alerts for function timeouts

## Cost Optimization

- Vercel has generous free tier limits
- Monitor function execution time
- Consider caching for frequently accessed data 