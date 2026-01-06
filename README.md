# IPO Tracker Dashboard

A full-stack web application for tracking and discovering upcoming Initial Public Offerings (IPOs) in the US market. Built with React, TypeScript, Node.js, and Express.

## Features

- **IPO Calendar**: Browse upcoming IPOs with detailed information
- **Search & Filters**: Find IPOs by company name, date range, and industry
- **Company Details**: View comprehensive company profiles and news
- **Favorites**: Save and track your favorite IPO companies (requires login)
- **Google OAuth**: Secure authentication with Google Sign-In
- **Market News**: Stay updated with IPO-related news and market updates
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Real-time Data**: Auto-refresh IPO data daily via cron jobs

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for data fetching and caching
- **Zustand** for state management
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **TypeScript** throughout
- **PostgreSQL** with Prisma ORM (optional - can use JSON storage)
- **Passport.js** for Google OAuth 2.0
- **Node-cron** for scheduled tasks
- **Finnhub API** for IPO data
- **NewsAPI** for market news

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL (optional - for production use)
- Google OAuth 2.0 credentials
- Finnhub API key
- NewsAPI key

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ipo-tracker
```

### 2. Install dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Set up environment variables

#### Server (.env)

Copy `server/.env.example` to `server/.env` and fill in the values:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (Optional - for PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/ipo_dashboard"

# For development without database, use JSON storage
USE_JSON_STORAGE=true

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Session Secret
SESSION_SECRET=your_random_secret_key

# API Keys
FINNHUB_API_KEY=your_finnhub_api_key
NEWS_API_KEY=your_news_api_key

# CORS
CLIENT_URL=http://localhost:5173
```

#### Client (.env)

Copy `client/.env.example` to `client/.env`:

```bash
VITE_API_URL=http://localhost:3000/api
```

### 4. Get API Keys

#### Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
6. Copy Client ID and Client Secret

#### Finnhub API Key
1. Sign up at [Finnhub](https://finnhub.io/)
2. Get your free API key from the dashboard

#### NewsAPI Key
1. Sign up at [NewsAPI](https://newsapi.org/)
2. Get your free API key

### 5. Database Setup (Optional)

If using PostgreSQL with Prisma:

```bash
cd server

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio
```

For development, you can use JSON file storage by setting `USE_JSON_STORAGE=true` in `.env`.

### 6. Run the application

#### Development Mode

Open two terminal windows:

```bash
# Terminal 1 - Run server
cd server
npm run dev

# Terminal 2 - Run client
cd client
npm run dev
```

The application will be available at:
- Client: http://localhost:5173
- Server: http://localhost:3000

#### Production Build

```bash
# Build client
cd client
npm run build

# Build server
cd server
npm run build

# Start server
npm start
```

## Project Structure

```
ipo-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── store/         # Zustand state management
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── styles/        # Global styles
│   ├── package.json
│   └── vite.config.ts
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Database models
│   │   └── types/        # TypeScript types
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### IPOs
- `GET /api/ipos?from=YYYY-MM-DD&to=YYYY-MM-DD` - Get IPO calendar
- `GET /api/ipos/company/:symbol` - Get company details
- `GET /api/ipos/company-news?companyName=X` - Get company news

### News
- `GET /api/news/market?query=X&limit=10` - Get market news
- `GET /api/news/headlines?limit=10` - Get business headlines

### Favorites (Protected)
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:symbol` - Remove from favorites

## Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Server
- `npm run dev` - Start development server with watch mode
- `npm run build` - Compile TypeScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Features Explained

### Authentication Flow
1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. After approval, redirected back to `/api/auth/google/callback`
4. Server creates/finds user in database
5. User session is created
6. Client redirects to home page

### Data Fetching
- Uses React Query for efficient data fetching and caching
- Automatic background refetching
- Loading and error states handled gracefully
- Optimistic updates for favorites

### Storage Options
- **Development**: JSON file storage (no database needed)
- **Production**: PostgreSQL with Prisma ORM

### Cron Jobs
- Runs daily at 6:00 AM to refresh IPO data
- Fetches upcoming IPOs for the next 3 months

## Troubleshooting

### CORS Issues
Ensure `CLIENT_URL` in server `.env` matches your frontend URL.

### API Rate Limits
- Finnhub free tier: 60 calls/minute
- NewsAPI free tier: 100 requests/day

Consider implementing caching for production use.

### Session Issues
Make sure cookies are enabled and `SESSION_SECRET` is set properly.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Acknowledgments

- [Finnhub API](https://finnhub.io/) for IPO data
- [NewsAPI](https://newsapi.org/) for news content
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://tanstack.com/query) for data fetching
