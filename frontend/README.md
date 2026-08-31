# Amruthahara frontend
11
This folder is the React + Vite Project storefront.

**Full project documentation** (architecture, file layout, frontend + backend routing, auth/cart/checkout/payment mechanisms, integrations, and block diagrams) is in the repository root:

**[../README.md](../README.md)**

## Quick start

```bash
npm install
npm run dev
```

`src/services/apiBase.js` is the single API host. On localhost it uses `http://localhost:5000`.

See `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```
