# Architecture

PurgeAI is a full-stack AI-powered code review assistant built as a monorepo using pnpm workspaces.

## High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Client       │────▶│    Server       │────▶│   Database      │
│   (Next.js)     │     │   (Express)     │     │  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   AI Provider   │
                        │  (AI Provider)    │
                        └─────────────────┘
```

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and Turbopack
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library (Radix UI primitives)
- **Zustand** - Client state management
- **TanStack Query** - Server state / data fetching
- **Motion** - Animations
- **Better Auth** - Client authentication

### Backend
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Better Auth** - Authentication framework
- **AI SDK** - AI integration
- **Razorpay** - Payment processing

### Infrastructure
- **Docker** - Containerization
- **Vercel** - Deployment platform
- **pnpm** - Package manager with workspaces

---

## Project Structure

```
purge.ai/
├── client/                 # Next.js frontend
│   ├── app/                # App Router pages
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Landing page
│   │   ├── chat/           # Chat interface
│   │   ├── pricing/        # Pricing page
│   │   ├── about/          # About page
│   │   └── t&c/            # Terms & Conditions
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── main/           # Page sections
│   │   └── micro-interactions/ # Animations
│   ├── lib/                # Utilities (axios, auth)
│   ├── store/              # Zustand stores
│   ├── utils/              # Helper functions
│   └── config/             # Client configuration
│
├── server/                 # Express.js backend
│   ├── index.ts            # Express app entry point
│   ├── routes/             # API route handlers
│   │   ├── chat.ts         # AI chat endpoint
│   │   ├── orderpay.ts     # Payment creation
│   │   ├── verifypayment.ts # Payment verification
│   │   ├── checkvalidsession.ts # Session validation
│   │   └── credits.ts      # Credit management
│   ├── middlewares/        # Express middleware
│   │   ├── checkCredits.ts # Credit validation
│   │   └── validSession.ts # Session validation
│   ├── lib/                # Server utilities
│   │   ├── auth.ts         # Better Auth setup
│   │   ├── config.ts       # Server configuration
│   │   ├── prisma.ts       # Prisma client
│   │   └── razorpay.ts     # Razorpay client
│   ├── prisma/             # Database schema
│   │   └── schema.prisma   # Database models
│   ├── constants/          # Server constants
│   └── schemas/            # Validation schemas
│
├── docker/                 # Docker configurations
│   ├── Dockerfile.client   # Client container
│   └── Dockerfile.server  # Server container
│
└── docker-compose.yml      # Docker orchestration
```

---

## Frontend Architecture

### App Router Structure

The client uses Next.js 15 App Router with the following structure:

- **Root Layout** (`app/layout.tsx`) - Contains ThemeProvider, QueryProvider, metadata
- **Landing Page** (`app/page.tsx`) - Hero, Features, Pricing preview
- **Chat** (`app/chat/`) - Main AI chat interface
- **Pricing** (`app/pricing/`) - Subscription plans
- **About** (`app/about/`) - About page
- **Terms** (`app/t&c/`) - Legal pages

### State Management

- **Zustand** (`client/store/`) - Client-side state (auth, UI state)
- **TanStack Query** - Server state caching and synchronization

### Component Hierarchy

```
layout.tsx
├── ThemeProvider
├── QueryProvider
└── children
    ├── Navbar
    ├── {page}
    └── Footer
```

---

## Backend Architecture

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/*` | ALL | Better Auth endpoints |
| `/api/chat` | POST | AI chat with PR review |
| `/api/checkvalidsession` | POST | Validate user session |
| `/api/orderpay` | POST | Create Razorpay order |
| `/api/verifypayment` | POST | Verify payment |

### Request Flow

```
Client Request
    │
    ▼
Express Middleware (Helmet, CORS, Cookie Parser)
    │
    ▼
Better Auth (/api/auth/*)
    │
    ▼
Custom Routes
    ├── checkCredits middleware
    │   └── Validate credit balance
    │
    ├── Chat Route
    │   ├── Extract PR URL from message
    │   ├── Fetch diff from GitHub
    │   ├── Build system prompt
    │   └── Stream AI response
    │
    └── Payment Routes
        ├── Create order
        └── Verify payment
```

### Database Schema

**Core Models:**

- **User** - Authenticated user data
- **Session** - Active user sessions
- **Account** - OAuth/credential accounts
- **Verification** - Email verification tokens
- **TempUsers** - Guest users with IP tracking
- **Plan** - User subscription plans with credits

---

## Authentication Flow

1. **Guest Users** - Limited credits based on IP address (TempUsers table)
2. **Authenticated Users** - Full access with Better Auth
3. **OAuth Providers** - GitHub, Google (via Better Auth)

---

## Payment Flow

1. User selects plan on pricing page
2. Client requests order creation (`/api/orderpay`)
3. Server creates Razorpay order, returns order ID
4. Client initiates Razorpay checkout
5. On success, client calls `/api/verifypayment`
6. Server verifies signature, credits user account

---

## Security

- **Helmet.js** - Security headers
- **CORS** - Restricted to frontend origin
- **Cookie Parser** - Secure cookie handling
- **Zod** - Request validation
- **Trust Proxy** - Proper IP handling behind proxies
- **Credit System** - Rate limiting via credits

---

## Deployment

### Development
```bash
pnpm client  # Start Next.js dev server (localhost:3000)
pnpm serv   # Start Express server (localhost:4000)
```

### Production (Docker)
```bash
docker-compose up --build
```

### Vercel
- Client deployed to Vercel
- Server configured with Vercel JSON config

---

## Data Flow: PR Review

1. User pastes GitHub PR URL in chat
2. Server validates PR URL format
3. Server fetches `.diff` from GitHub
4. System prompt is constructed with diff content
5. AI model streams code review response
6. Response is piped back to client in real-time
