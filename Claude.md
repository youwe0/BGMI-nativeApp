# BGMI Tournament Platform - App Specifications

## Project Overview
Native mobile app for BGMI (Battlegrounds Mobile India) tournament organization and hosting platform.

**Tech Stack**: React Native with Expo, React Navigation, Context API for state management

**Status**: MVP - View-only UI (No backend/API integration)

---

## App Flow

### 1. Landing Page (First Screen)
- **Purpose**: Fullscreen landing with esports vibe
- **Elements**:
  - App name: "YouWe"
  - Tagline: "Host. Join. Dominate."
  - Primary CTA: "Enter App" button
- **Action**: Navigate to Slots Page on button click

### 2. Slots Page (Main Screen)
- **Purpose**: Display available/filled player slots
- **Layout**: 8 player slots in grid (2x4 or 4x2)
- **Slot Card Contains**:
  - Slot number (Slot 1, Slot 2, etc.)
  - Status badge: Available / Filled
  - Player name (if filled)
- **Note**: Static UI, no API calls

### 3. Sidebar Navigation (Drawer)
- **Access**: Hamburger icon (top-left)
- **Menu Items**:
  - 👤 Profile (view-only)
  - 🎮 Matches (Slots page)
  - 🌗 Theme Toggle
  - 🚪 Logout (UI only)

---

## Theme System

### Dark Theme (Primary)
```
Background: #0B0F14 (deep black)
Primary Accent: #00E5FF (cyan)
Secondary Accent: #7C4DFF (violet)
Cards: #141A22
Text: #EAEAEA
```

### Light Theme
```
Background: #FFFFFF
Primary Accent: #1A73E8 (blue)
Secondary Accent: #FF7043 (orange)
Cards: #F5F7FA
Text: #1C1C1C
```

**Toggle**: Instant theme switch across entire app

---

## Design Guidelines

✅ Minimal, clean, esports-style UI
✅ Rounded cards (12-16px border radius)
✅ Subtle shadows (light) / soft borders (dark)
✅ Responsive for all mobile screen sizes
❌ No animations required (keep it simple)

---

## File Structure

```
myApp/
├── app/
│   ├── (drawer)/          # Drawer navigation group
│   │   ├── _layout.tsx    # Drawer navigator
│   │   ├── slots.tsx      # Slots page (main)
│   │   └── profile.tsx    # Profile page
│   ├── index.tsx          # Landing page
│   └── _layout.tsx        # Root layout
├── components/
│   ├── SlotCard.tsx       # Reusable slot component
│   └── themed-*           # Existing themed components
├── contexts/
│   └── ThemeContext.tsx   # Theme provider
└── constants/
    └── theme.ts           # Theme colors
```

---

## Technical Requirements

- ✅ React Native with Expo
- ✅ React Navigation (Stack + Drawer)
- ✅ Context API for theme state
- ✅ Well-structured folder layout
- ✅ Reusable components
- ✅ Clean, readable, extendable code

---

## Important Notes

⚠️ **This is a view-only MVP**
- No authentication system
- No API calls or backend integration
- No real data persistence
- Focus on UI, layout, and theme system

🔮 **Future Integration Points**
- API endpoints for slots data
- User authentication
- Real-time slot updates
- Payment integration
- Match scheduling

---

## Color Palette Reference

### Dark Theme
| Element | Color | Hex |
|---------|-------|-----|
| Background | Deep Black | #0B0F14 |
| Card | Dark Gray | #141A22 |
| Primary | Cyan | #00E5FF |
| Secondary | Violet | #7C4DFF |
| Text | Light Gray | #EAEAEA |

### Light Theme
| Element | Color | Hex |
|---------|-------|-----|
| Background | White | #FFFFFF |
| Card | Light Gray | #F5F7FA |
| Primary | Blue | #1A73E8 |
| Secondary | Orange | #FF7043 |
| Text | Dark Gray | #1C1C1C |

---

## Development Status

- [x] Project setup
- [x] App naming (YouWe)
- [ ] Theme system implementation
- [ ] Landing page
- [ ] Slots page
- [ ] Drawer navigation
- [ ] Profile screen
- [ ] Theme toggle functionality

---

*Last Updated: 2026-02-02*
