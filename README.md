# Too Too - BGMI Native App

A React Native + Expo app for BGMI players to host tournaments, join live challenges, track leaderboard rank, and manage wallet activity.

## Overview

Too Too is built with Expo Router and a drawer-first navigation flow. The interface is focused on fast access to competitive gameplay features:

- Tournament hosting and discovery
- Live challenge arena (Classic, TDM, WOW)
- Leaderboards and player profiles
- Wallet and transaction history
- Notifications, achievements, and in-app chat

## UI Interface

## 1. Entry and Authentication

- Landing screen with brand hero, feature pills, and two clear CTAs: `Login` and `Sign Up`
- Dedicated login and signup screens with gradient headers and form sheets
- Post-login route enters the main drawer experience

## 2. Navigation Structure

- Root stack routes:
  - `/(tabs)/index` (landing)
  - `login`, `signup`
  - `/(drawer)` (main app)
  - Detail/create routes: tournament, challenge, profile, achievements, chat
- Drawer navigation includes:
  - Home
  - Challenge Arena
  - Leaderboard
  - Wallet
  - Notifications
- Hidden but accessible routes from actions:
  - Tournaments
  - Slots
  - Profile
- Custom drawer UI includes:
  - Profile shortcut
  - Theme toggle
  - Logout action

## 3. Home Dashboard UI

Home acts as a command center with:

- Welcome header with player name and tier badge
- Quick stats bar (`K/D`, wins, earnings, matches)
- Featured live `Challenge Arena` hero card
- Quick access cards:
  - Host (create tournament)
  - Leaderboard
  - Wallet
- Game modes banner (Classic, TDM, WOW)

## 4. Tournament Experience UI

### Tournaments List

- Filter chips: `All`, `Upcoming`, `Ongoing`, `Completed`
- Tournament cards with:
  - Mode/map/perspective tags
  - Entry fee, prize pool, team occupancy
  - Registration progress bar

### Create Tournament

4-step form flow:

1. Info
2. Game
3. Entry
4. Review

Supports all tournament types:

- Classic: mode + map
- TDM: mode + gun category + gun selection
- WOW: map code + WOW mode

Includes validation, review summary, and success confirmation screen.

### Tournament Detail

- Full tournament summary with status badge
- Prize distribution visualization
- Slot availability and registered teams grid
- Room detail section (restricted before start)
- Register CTA with state handling (open/full/completed)

## 5. Challenge Arena UI

### Challenge List

- Tabs: `All`, `Classic`, `TDM`, `WOW`
- Reusable challenge cards from mock service data
- Floating `Create Challenge` action button

### Create Challenge

3-step flow:

1. Settings
2. Entry
3. Preview

Includes tournament-type specific fields, auto-match toggle, and publish confirmation.

### Challenge Detail

- Host profile snippet and challenge metadata
- Entry/prize summary cards
- Slot progress and remaining count
- Rules section
- Match countdown timer
- Primary join button + secondary actions (result/screenshot placeholders)

## 6. Leaderboard, Profile, and Social UI

### Leaderboard

- Period tabs: `Weekly`, `Monthly`, `All-Time`
- Top-3 podium strip
- Full ranked list

### Profile (Self + Public)

- Avatar, rank badge, and skill tags
- Stats grid (K/D, win rate, matches, earnings, etc.)
- Recent match history cards
- Achievements preview and deep link to full achievements screen
- Public profile includes `Challenge This Player` CTA

### Chat

- Header with chat type title and online indicator
- Bubble chat layout (mine vs others)
- Message composer with send state

## 7. Wallet, Notifications, and Achievements UI

### Wallet

- Balance card with available, locked, and total earnings values
- Action row: `Add Money`, `Withdraw` (UI placeholders)
- Transaction history list with typed transaction cards

### Notifications

- Unread count in header
- `Mark all read` action
- Notification list + empty-state UI

### Achievements

- Unlock progress bar
- 3-column achievement grid
- Locked state overlay visuals

## 8. Theming and Visual Language

- Custom `ThemeContext` with light/dark toggle support
- Brand palette centered around:
  - Primary orange `#FF6B00`
  - Secondary gold `#F5B301`
  - Dark navy backgrounds
- Reusable UI primitives:
  - `GlassCard`
  - `GradientButton`
  - `Badge`

## Features Implemented

- Expo Router-based multi-screen navigation
- Drawer-first app shell with custom content
- Mock service layer for:
  - Profile
  - Challenges
  - Leaderboard
  - Wallet
  - Notifications
  - Achievements
- Multi-step form workflows for creating tournaments/challenges
- Detail screens with progress indicators and status-driven UI
- In-app theming with runtime toggle
- Reusable card/component architecture

## Tech Stack

- Expo SDK 54
- React Native 0.81
- React 19
- Expo Router
- React Navigation (Drawer)
- TypeScript

## Project Structure

```txt
app/                # Routes and screen UI
components/         # Shared UI and cards
services/           # Mock data/services
contexts/           # Theme context/provider
constants/          # Theme + tournament config
types/              # App-wide TypeScript types
```

## Run Locally

```bash
npm install
npx expo start
```

Optional:

```bash
npm run android
npm run ios
npm run web
```

## Current Notes

- Data is currently mock/in-memory and suitable for UI prototyping.
- Auth, payments, real-time chat, and backend integration are not wired yet.
