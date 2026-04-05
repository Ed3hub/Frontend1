# ED3Hub Frontend

Next.js application for the ED3Hub decentralized education platform.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
```

Create a `.env.local` file in this directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
npm run dev
```

App available at: **http://localhost:3000**

> The backend must be running at `http://localhost:8000`. See the [Backend repo](https://github.com/Ed3hub/Backend) for setup.

## Docker

```bash
docker build -t ed3hub-frontend .
docker run -p 3000:3000 ed3hub-frontend
```

## Project Structure

```
Frontend/
├── src/
│   ├── app/                        # Next.js app router pages
│   │   ├── (auth)/                 # Login, register, OTP
│   │   ├── (dashboard)/            # Shared dashboard routes
│   │   ├── (marketing)/            # Public landing pages
│   │   ├── courses/                # Course browsing & viewing
│   │   └── notifications/          # Notifications page
│   ├── components/                 # Reusable UI components
│   ├── creators_dashboard/         # Educator dashboard entry
│   ├── creators_dashboard_components/  # Educator-specific components
│   ├── learners_dashboard/         # Learner dashboard
│   ├── context/                    # Auth context (React Context)
│   ├── hooks/                      # Custom hooks (chat, notifications)
│   ├── landing/                    # Landing page components
│   └── lib/                        # API client, auth helpers, utilities
├── public/                         # Static assets
├── Dockerfile
└── .env.local
```

## Design System

Configured in `tailwind.config.ts`:

- **Brand colors**: `primary` (#00A6FB), `secondary` (#E8F1F2)
- **State colors**: `success` (#27AE60), `warning` (#E2B93B), `error` (#B00020)
- **Headings**: Poppins | **Body**: Open Sans
- Use `text-primary`, `font-heading`, `container`, `gap-grid` Tailwind classes

## Additional Docs

- [Backend Integration Guide](BACKEND_INTEGRATION_GUIDE.md) — API data flow & type mappings
- [Educators Upload Guide](EDUCATORS_UPLOAD_GUIDE.md) — Course upload walkthrough
- [Quick Start for Educators](QUICK_START_EDUCATORS.md)
- [Quiz & Assessment Manager Guide](QUIZ_ASSESSMENT_MANAGER_GUIDE.md)
- [Upload Features Summary](UPLOAD_FEATURES_SUMMARY.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Quick Contributor Guide](QUICK_CONTRIBUTOR_GUIDE.md)

## Contributing

**All code must be written in TypeScript.**

1. Fork this repository
2. Clone your fork: `git clone https://github.com/<your_user_name>/Frontend.git`
3. Add upstream: `git remote add upstream https://github.com/Ed3hub/Frontend.git`
4. Create a branch: `git checkout -b feature/your-feature`
5. Commit & push, then open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

## Production Build

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host. Set `NEXT_PUBLIC_API_URL` to your production backend URL.

## Testing

```bash
npm test
```
