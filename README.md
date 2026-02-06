# SweetZone Mobile App

SweetZone is an Expo Router + React Native storefront that showcases curated collections, handles carts and orders, and syncs auth + data through Firebase. The repo is optimized for development inside Expo Go, custom dev builds, and web previews via React Native Web.

## Tech Stack

- Expo SDK 54 with Expo Router file-based navigation
- React Native 0.81 / React 19
- Firebase (Auth + Firestore) for persistent data
- NativeWind + Tailwind CSS for styling
- React Navigation bottom tabs for dashboard flows

## Features

- Email/password auth with persistent Firebase sessions and guarded dashboard routes
- Product collections, category filters, and promo tiles rendered from Firestore-friendly data models
- Cart context with quantity syncing, contextual CTA badges, and haptic tab feedback
- Order placement + lightweight order tracking backed by Firestore writes and optimistic UI states
- Parallax hero sections, themed typography, and NativeWind-powered dark/light styling tokens
- Loader overlay + toast-ready context to centralize asynchronous UX feedback

## Screenshots

These live previews help designers/devs stay aligned. Replace or add more PNGs inside `assets/images/` and reference them here.

![Sign in page](/assets/images/login.jpeg)

![Sign Up page](/assets/images/signup.jpeg)

![Home page](/assets/images/home.jpeg)

![Collection](/assets/images/collection.jpeg)

![Order](/assets/images/order.jpeg)

![PastOrder](/assets/images/pastorders.jpeg)

## Prerequisites

- Node.js 18+ and npm 10+ (check with `node -v` / `npm -v`)
- Latest Android Studio (emulator) and/or Xcode Command Line Tools if you plan to run native simulators
- Expo Go app on your device for quick QR testing (optional but recommended)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure Firebase**

   The default config lives in `services/firebase.ts`. Update the `firebaseConfig` object with your own project credentials or load them from secure storage before shipping. Re-run Metro if you change these values.

3. **(Optional) VS Code Tailwind IntelliSense**

   Install the official Tailwind CSS extension and ensure `tailwind.config.js` is in the workspace root for class autocomplete inside `*.tsx` files.

## Run Instructions

| Target | Command | Notes |
| --- | --- | --- |
| Metro + QR | `npm run start` | Opens Expo CLI UI with QR + tunnel options |
| Android emulator/device | `npm run android` | Requires an emulator booted or physical device with USB debugging |
| iOS simulator/device | `npm run ios` | Runs only on macOS with Xcode |
| Web preview | `npm run web` | Uses React Native Web + Vite dev server via Expo |

After Metro boots, press `a`, `i`, or `w` in the terminal to launch the desired target, or scan the QR code with Expo Go.

## Useful Scripts

- `npm run lint` – run Expo ESLint rules across the project
- `npm run reset-project` – restore the starter template (destructive; copies files from `app-example`)

## Project Structure

```
app/
  index.tsx              # Landing screen / entry route
  (auth)/*               # Expo Router group for login/register flows
  (dashboard)/*          # Authenticated tabs (home, cart, orders, profile)
components/              # Shared UI primitives (tabs, parallax scroll, themed views)
context/                 # React contexts: Auth, Cart, Loader, Order
services/firebase.ts     # Firebase bootstrap (Auth + Firestore)
constants/theme.ts       # Design tokens consumed by NativeWind
```

## Troubleshooting

- Clear Expo + Metro caches when dependencies change: `npx expo start --clear`.
- If Hermes or Reanimated build issues appear, reinstall pods / rebuild dev clients after upgrading Expo SDKs.
- Firebase web keys are public identifiers, but keep write-access rules tight in the Firebase console before production.

Happy building!
