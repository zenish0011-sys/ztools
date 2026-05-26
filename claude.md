Here's your CLAUDE.md — save this in your project root:
markdown# ZTools — Project Overview for Claude

## What ZTools is
Lightweight AI tools storefront. Frontend-only, no backend.
Optimized for Reddit traffic. Manual fulfillment via WhatsApp/Telegram.

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router DOM
- Firebase Firestore (product database)
- Cloudinary (image storage)
- EmailJS (payment proof emails)
- Hosted on Vercel

## Project Structure
src/
├── constants/
│   └── consts.js              # all constants: WA, TG, Reddit, EmailJS, Cloudinary, Firebase keys
├── lib/
│   └── firebase.js            # Firebase init
├── services/
│   └── productService.js      # Firestore CRUD: getProducts, addProduct, updateProduct, deleteProduct
├── utils/
│   ├── uploadToCloudinary.js  # uploads image to Cloudinary, returns secure_url
│   └── proofStorage.js        # localStorage helpers for proof images (get/add/remove)
├── components/
│   ├── Navbar.jsx             # Home | About | Proofs dropdown | Vouch Storage link
│   └── ProductCard.jsx        # card used in Home grid
├── pages/
│   ├── Home.jsx               # product grid, reads from Firestore
│   ├── ProductDetail.jsx      # single product, reads from Firestore
│   ├── PaymentProof.jsx       # payment proof form → Cloudinary upload → EmailJS
│   ├── Proofs.jsx             # /proofs/:type — whatsapp/telegram/reddit, reads localStorage
│   ├── About.jsx              # about page with payment methods + contact buttons
│   └── AdminUpload.jsx        # SECRET route /zt-admin-x9k2
│                              # Section 1: Logo upload (single, overrides)
│                              # Section 2: Proofs (whatsapp/telegram/reddit, append)
│                              # Section 3: Products CRUD (add/edit/delete → Firestore)
└── App.jsx                    # all routes defined here

## Routing
| Route | Page | Public? |
|---|---|---|
| / | Home | ✅ |
| /product/:id | ProductDetail | ✅ |
| /about | About | ✅ |
| /proofs/:type | Proofs | ✅ |
| /payment-proof | PaymentProof | ✅ |
| /zt-admin-x9k2 | AdminUpload | 🔒 secret |

## Constants (src/constants/consts.js)
- `WHATSAPP_NUMBER` — used in ProductDetail buy button + About page
- `TELEGRAM_USERNAME` — used in ProductDetail buy button + About page
- `REDDIT_VOUCH_POST` — used in Navbar vouch link + Proofs page
- `SITE_NAME` — used in Navbar
- `PAYMENT_METHODS` — used in PaymentProof form select + About page
- `CLOUDINARY_CLOUD_NAME` + `CLOUDINARY_UPLOAD_PRESET` — used in uploadToCloudinary.js
- `EMAILJS_SERVICE_ID` + `EMAILJS_TEMPLATE_ID` + `EMAILJS_PUBLIC_KEY` — used in PaymentProof.jsx

## Firebase
- Firestore collection: `products`
- Each document has: id, name, tagline, description, price, currency,
  duration, stock, warranty, image, whatsapp_message, features[]

## Cloudinary Folder Structure
ztools/
├── logo/             # site logo (admin uploads, single)
├── proofs/
│   ├── whatsapp/     # whatsapp proof screenshots
│   ├── telegram/     # telegram proof screenshots
│   └── reddit/       # reddit proof screenshots
└── payment-proofs/   # customer payment proof uploads

## Data Flow
- Products: Firestore → Home.jsx / ProductDetail.jsx (live)
- Proofs: localStorage (admin uploads) → Proofs.jsx
- Logo: localStorage → Navbar (not yet wired, planned)
- Payment proof: customer uploads → Cloudinary → URL → EmailJS → Gmail

## Key Design Principles
- No backend, no auth, no payment gateway
- Admin panel is security-by-obscurity (secret URL only)
- products.json is DELETED — Firestore is source of truth
- Manual fulfillment after payment verification

## User Journey
1. User arrives from Reddit
2. Browses products on Home
3. Clicks product → ProductDetail
4. Chooses WhatsApp / Telegram (fast) OR manual payment
5. If manual: submits proof via /payment-proof
6. Owner verifies email → delivers manually

## Environment Variables (.env)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
Note: Cloudinary + EmailJS keys stored in consts.js (not .env) since they are public-safe.
Firebase keys go in .env and are accessed via import.meta.env.VITE_*

## What's NOT built yet
- Logo display in Navbar (uploaded but not wired to show)
- Product page payment method instructions (show Binance QR etc.)
- Mobile responsive polish
- SEO / meta tags


















