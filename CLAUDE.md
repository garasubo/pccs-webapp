# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Architecture Overview

This is a React-based PCCS (Practical Color Coordinate System) learning web application built with Vite. The app helps users learn color theory by presenting random colors and asking them to identify the correct tone and hue number.

### Key Architecture Components

**Component Structure:**
- `App.jsx`: Main application component managing state and orchestrating child components
- Components are organized in `/src/components/` with single responsibilities
- Custom hook `useScore.js` handles score management with localStorage persistence

**Data Layer:**
- `pccsData.js`: Complete PCCS color system database with RGB values for all tone/hue combinations
- Supports 12 tones with different hue systems (Vivid: 24 hues, others: 12 hues)
- Includes Japanese color names and systematic color generation

**State Management:**
- React's built-in useState/useEffect for component state
- Custom `useScore` hook for persistent score tracking
- No external state management library used

**Key Features:**
- Interactive color identification game
- Real-time feedback system
- Keyboard shortcuts (Enter to submit, Space for next)
- Score persistence via localStorage
- Responsive design for mobile/desktop
- Reference panel with tone/hue explanations

## PCCS Color System

The app implements the complete PCCS color coordinate system:
- **12 Tones**: v, b, s, dp, lt, sf, d, dk, p, ltg, g, dkg
- **Hue Systems**: Vivid uses 1-24 hues, all others use 2,4,6,8,10,12,14,16,18,20,22,24
- **Color Data**: Accurate RGB values for all tone/hue combinations stored in `pccsData.js`

## Development Notes

- Built with React 19 and Vite for fast development
- Uses ESLint for code quality
- No TypeScript (pure JSX/JS)
- CSS uses modern Flexbox/Grid layouts
- Component props are passed down from App.jsx to child components
- Debug logging exists in App.jsx for question generation