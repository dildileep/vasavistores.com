# VasaviStores

AI-first eCommerce platform for smart NFC business products (TapReview AI NFC Card). Built with React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

## How to run

```
npm run dev
```

Runs on port 5000. The "Start application" workflow handles this automatically.

## Stack

- **Frontend**: React 18 + Vite 5 + TypeScript + Tailwind CSS v4
- **UI**: shadcn/ui + Radix UI + Framer Motion
- **Backend/DB**: Supabase (auth, database, RLS)
- **Payments**: Razorpay (client integrated; live keys needed)
- **Shipping**: Shiprocket (schema ready; edge function needed)
- **Routing**: TanStack Router

## Environment variables

Already in `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Still needed for full functionality:
- `VITE_RAZORPAY_KEY_ID` — Razorpay live key for payment processing
- Shiprocket API credentials — for shipment creation/tracking

## Key pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/shop` | Product listing |
| `/products/:slug` | Product detail |
| `/cart` | Cart |
| `/checkout` | Multi-step checkout |
| `/account` | User dashboard |
| `/admin` | Admin suite |

## User preferences

- Keep existing project structure and stack
