# IPO Dashboard - Project Structure

## Overview
This is a full-stack TypeScript monorepo application with separate client and server directories.

## Directory Structure

```
IPO-Dashboard/
│
├── client/                          # React Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/             # Reusable UI Components
│   │   │   ├── Navbar.tsx          # Navigation bar with auth
│   │   │   ├── IPOCard.tsx         # IPO company card
│   │   │   ├── IPOCardSkeleton.tsx # Loading skeleton
│   │   │   ├── NewsCard.tsx        # News article card
│   │   │   └── LoadingSpinner.tsx  # Loading spinner
│   │   │
│   │   ├── pages/                  # Page Components
│   │   │   ├── Dashboard.tsx       # Main IPO dashboard with filters
│   │   │   ├── CompanyDetail.tsx   # Company detail page
│   │   │   ├── Favorites.tsx       # User favorites page
│   │   │   └── AuthSuccess.tsx     # OAuth callback page
│   │   │
│   │   ├── services/
│   │   │   └── api.ts              # API client (Axios)
│   │   │
│   │   ├── store/                  # Zustand State Management
│   │   │   ├── authStore.ts        # Authentication state
│   │   │   └── favoritesStore.ts   # Favorites state
│   │   │
│   │   ├── hooks/                  # Custom React Hooks
│   │   │   ├── useIPOs.ts          # IPO data hooks (React Query)
│   │   │   ├── useNews.ts          # News data hooks
│   │   │   └── useFavorites.ts     # Favorites management
│   │   │
│   │   ├── utils/                  # Utility Functions
│   │   │   ├── date.ts             # Date formatting utilities
│   │   │   └── format.ts           # Number/currency formatting
│   │   │
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript type definitions
│   │   │
│   │   ├── styles/
│   │   │   └── index.css           # Tailwind CSS + custom styles
│   │   │
│   │   ├── App.tsx                 # Main app component with routing
│   │   └── main.tsx                # App entry point
│   │
│   ├── index.html                  # HTML template
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── postcss.config.js           # PostCSS config
│   ├── tsconfig.json               # TypeScript config
│   ├── .eslintrc.cjs               # ESLint config
│   ├── .prettierrc                 # Prettier config
│   ├── .env.example                # Environment variables template
│   └── package.json                # Dependencies and scripts
│
├── server/                          # Node.js Backend (Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   └── passport.ts         # Passport.js OAuth config
│   │   │
│   │   ├── controllers/            # Route Controllers
│   │   │   ├── authController.ts   # Authentication logic
│   │   │   ├── ipoController.ts    # IPO endpoints
│   │   │   ├── newsController.ts   # News endpoints
│   │   │   └── favoritesController.ts # Favorites CRUD
│   │   │
│   │   ├── routes/                 # API Routes
│   │   │   ├── auth.ts             # /api/auth routes
│   │   │   ├── ipos.ts             # /api/ipos routes
│   │   │   ├── news.ts             # /api/news routes
│   │   │   └── favorites.ts        # /api/favorites routes
│   │   │
│   │   ├── services/               # Business Logic & External APIs
│   │   │   ├── finnhub.ts          # Finnhub API integration
│   │   │   ├── news.ts             # NewsAPI integration
│   │   │   └── cronJobs.ts         # Scheduled tasks
│   │   │
│   │   ├── models/                 # Data Layer
│   │   │   ├── db.ts               # Database abstraction layer
│   │   │   └── jsonStorage.ts      # JSON file storage (dev mode)
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.ts             # Authentication middleware
│   │   │
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript types
│   │   │
│   │   └── index.ts                # Server entry point
│   │
│   ├── prisma/
│   │   └── schema.prisma           # Prisma database schema
│   │
│   ├── data/                       # JSON storage directory (git-ignored)
│   │
│   ├── tsconfig.json               # TypeScript config
│   ├── .eslintrc.cjs               # ESLint config
│   ├── .prettierrc                 # Prettier config
│   ├── .env.example                # Environment variables template
│   └── package.json                # Dependencies and scripts
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Root package.json (workspace scripts)
├── README.md                        # Main documentation
├── SETUP.md                         # Quick setup guide
└── PROJECT_STRUCTURE.md             # This file

```

## Key Files Explained

### Frontend (Client)

#### Core Files
- **App.tsx**: Main app component with React Router setup, protected routes, and React Query provider
- **main.tsx**: Entry point that renders the App component

#### Pages
- **Dashboard.tsx**: Main page showing IPO list with search, filters, and sorting
- **CompanyDetail.tsx**: Detailed company information and news
- **Favorites.tsx**: User's saved IPO companies with days-until-IPO counter
- **AuthSuccess.tsx**: OAuth callback handler

#### Components
- **Navbar.tsx**: Navigation with logo, links, and auth status
- **IPOCard.tsx**: Displays IPO info with favorite button
- **NewsCard.tsx**: News article display with image
- **LoadingSpinner.tsx**: Reusable loading indicator
- **IPOCardSkeleton.tsx**: Loading placeholder

#### State Management
- **authStore.ts**: User authentication state (Zustand)
- **favoritesStore.ts**: Favorites list state (Zustand)

#### Hooks
- **useIPOs.ts**: React Query hooks for IPO data
- **useNews.ts**: React Query hooks for news data
- **useFavorites.ts**: Mutations for adding/removing favorites

#### Services
- **api.ts**: Axios client with all API methods organized by domain

### Backend (Server)

#### Core Files
- **index.ts**: Express server setup, middleware, routes, and initialization

#### Routes
- **auth.ts**: Google OAuth endpoints
- **ipos.ts**: IPO calendar and company data endpoints
- **news.ts**: Market news endpoints
- **favorites.ts**: Favorites CRUD endpoints (protected)

#### Controllers
- Handle request/response logic
- Validate inputs
- Call service layer
- Format responses

#### Services
- **finnhub.ts**: Finnhub API integration for IPO data
- **news.ts**: NewsAPI integration for news articles
- **cronJobs.ts**: Daily data refresh job

#### Models
- **db.ts**: Unified database interface (supports both Prisma and JSON)
- **jsonStorage.ts**: JSON file-based storage for development

#### Config
- **passport.ts**: Google OAuth 2.0 strategy configuration

#### Middleware
- **auth.ts**: Route protection middleware

## Data Flow

### IPO Data Flow
1. Client requests IPO data → `useIPOs` hook
2. Hook calls → `ipoApi.getIPOs()`
3. API client → `GET /api/ipos`
4. Server route → `ipoController.getIPOs()`
5. Controller → `finnhubService.getIPOCalendar()`
6. External API → Finnhub API
7. Response flows back through the stack
8. React Query caches the result

### Authentication Flow
1. User clicks "Sign in with Google"
2. Redirect → `GET /api/auth/google`
3. Google OAuth consent screen
4. Callback → `GET /api/auth/google/callback`
5. Passport verifies → Creates/finds user
6. Session created → Redirect to `/auth/success`
7. Client fetches user → `GET /api/auth/me`
8. Updates auth store

### Favorites Flow
1. User adds favorite → `useFavorites.addFavorite()`
2. Mutation → `POST /api/favorites`
3. Server checks auth → Saves to database/JSON
4. Returns favorite → Updates Zustand store
5. React Query invalidates cache
6. UI updates optimistically

## Technology Choices

### Frontend
- **Vite**: Fast dev server and builds
- **React Query**: Powerful data fetching with caching
- **Zustand**: Lightweight state management
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing

### Backend
- **Express**: Minimal, flexible web framework
- **Passport.js**: Authentication middleware
- **Prisma**: Type-safe ORM (optional)
- **Node-cron**: Scheduled tasks
- **Axios**: HTTP client for external APIs

## API Integration Points

### Finnhub
- IPO Calendar: `/calendar/ipo`
- Company Profile: `/stock/profile2`
- Company News: `/company-news`

### NewsAPI
- Everything: `/v2/everything`
- Top Headlines: `/v2/top-headlines`

## Database Options

### Development (JSON Storage)
- No database setup required
- Files stored in `server/data/`
- Perfect for quick start

### Production (PostgreSQL + Prisma)
- Type-safe database access
- Automatic migrations
- Relational data integrity

## Environment Variables

### Client
- `VITE_API_URL`: Backend API base URL

### Server
- `PORT`: Server port
- `NODE_ENV`: Environment mode
- `DATABASE_URL`: PostgreSQL connection (optional)
- `USE_JSON_STORAGE`: Enable JSON storage
- `GOOGLE_CLIENT_ID`: OAuth client ID
- `GOOGLE_CLIENT_SECRET`: OAuth secret
- `SESSION_SECRET`: Session encryption key
- `FINNHUB_API_KEY`: Finnhub API key
- `NEWS_API_KEY`: NewsAPI key
- `CLIENT_URL`: Frontend URL for CORS

## Scripts

### Root Level
- `npm run install:all`: Install all dependencies
- `npm run dev`: Run both client and server
- `npm run build`: Build both projects
- `npm run client`: Run client only
- `npm run server`: Run server only

### Client
- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run format`: Format with Prettier

### Server
- `npm run dev`: Start with hot reload
- `npm run build`: Compile TypeScript
- `npm start`: Run production build
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run migrations
- `npm run prisma:studio`: Open database GUI

## Development Workflow

1. **Setup**: Follow SETUP.md
2. **Development**: Run `npm run dev` from root
3. **Make Changes**: Edit files with hot reload
4. **Test**: Use browser and API endpoints
5. **Build**: Run `npm run build`
6. **Deploy**: Deploy client and server separately

## Deployment Considerations

### Client
- Static files (build output)
- Can deploy to: Vercel, Netlify, Cloudflare Pages
- Update `VITE_API_URL` for production

### Server
- Node.js application
- Can deploy to: Railway, Render, Heroku, AWS
- Set environment variables
- Use PostgreSQL in production
- Enable HTTPS

## Security Features

- Google OAuth 2.0 authentication
- Express session management
- CORS protection
- Protected API routes
- Input validation
- Environment variable security
