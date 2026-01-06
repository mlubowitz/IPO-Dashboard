# Quick Setup Guide

## Step-by-Step Installation

### 1. Install Dependencies

From the root directory:

```bash
# Option 1: Install all dependencies at once
npm install
npm run install:all

# Option 2: Install individually
cd client && npm install
cd ../server && npm install
```

### 2. Configure Environment Variables

#### Server Environment

Create `server/.env` from `server/.env.example`:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and add your API keys:

**Required:**
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `FINNHUB_API_KEY` - From finnhub.io
- `NEWS_API_KEY` - From newsapi.org
- `SESSION_SECRET` - Generate a random string

**Optional (for JSON storage in dev):**
- Set `USE_JSON_STORAGE=true` to skip PostgreSQL setup

#### Client Environment

Create `client/.env` from `client/.env.example`:

```bash
cp client/.env.example client/.env
```

Usually no changes needed for local development.

### 3. Database Setup (Optional)

**Skip this if using JSON storage (`USE_JSON_STORAGE=true`)**

If using PostgreSQL:

```bash
cd server

# Install PostgreSQL locally or use a cloud service
# Update DATABASE_URL in .env

# Generate Prisma client and run migrations
npm run prisma:generate
npm run prisma:migrate
```

### 4. Run the Application

#### Development Mode (Recommended)

From the root directory:

```bash
npm run dev
```

This runs both client and server concurrently.

#### Or run separately:

```bash
# Terminal 1
npm run server

# Terminal 2
npm run client
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

## Getting API Keys

### Google OAuth (Required for Login)

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Set application type to "Web application"
7. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
8. Copy Client ID and Client Secret to `.env`

### Finnhub API (Required for IPO Data)

1. Sign up at https://finnhub.io/
2. Go to Dashboard
3. Copy your API Key
4. Add to `.env` as `FINNHUB_API_KEY`

### NewsAPI (Required for News)

1. Sign up at https://newsapi.org/
2. Get your API key from the account page
3. Add to `.env` as `NEWS_API_KEY`

## Troubleshooting

### Port Already in Use

If ports 3000 or 5173 are in use:

**Change server port:**
Edit `server/.env`: `PORT=3001`

**Change client port:**
Edit `client/vite.config.ts`: `server: { port: 5174 }`

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf client/node_modules server/node_modules
npm run install:all
```

### Prisma Errors

```bash
cd server
npx prisma generate
npx prisma migrate dev
```

### CORS Errors

Ensure `CLIENT_URL` in `server/.env` matches your frontend URL (default: `http://localhost:5173`)

## Development Tips

1. **Use JSON Storage for Quick Start**: Set `USE_JSON_STORAGE=true` in `server/.env`
2. **Hot Reload**: Both client and server support hot reload in dev mode
3. **API Testing**: Use the health endpoint to verify server is running
4. **Database GUI**: Run `npm run prisma:studio` to view/edit data

## Next Steps

1. Set up all API keys
2. Test authentication by signing in with Google
3. Browse the IPO dashboard
4. Add companies to favorites
5. View company details and news

For detailed documentation, see [README.md](README.md)
