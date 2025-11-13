# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cleaning services company website (GMG - Servicios de Aseo) built with Vite, React, TypeScript, shadcn/ui, and Tailwind CSS. It's a single-page application featuring an interactive Hero section with P5.js canvas effects, service descriptions, about section, and contact form.

## Development Commands

### Install dependencies
```bash
npm i
```

### Start development server
```bash
npm run dev
```
Runs on `http://[::]:8080` (Vite dev server with host "::" for network access)

### Build for production
```bash
npm run build
```

### Build in development mode
```bash
npm run build:dev
```

### Preview production build
```bash
npm preview
```

### Lint code
```bash
npm run lint
```

## Architecture

### Tech Stack
- **Build tool**: Vite with React SWC plugin
- **Framework**: React 18.3+ with TypeScript
- **Routing**: React Router DOM v6
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom animations
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query (React Query) for server state
- **Interactive Graphics**: P5.js for canvas-based effects
- **Icons**: Lucide React

### Project Structure

```
src/
├── pages/              # Route pages
│   ├── Index.tsx       # Main landing page (assembles all sections)
│   └── NotFound.tsx    # 404 page
├── components/         # React components
│   ├── ui/            # shadcn/ui components (auto-generated)
│   ├── Hero.tsx       # Hero section with P5.js interactive canvas
│   ├── Navbar.tsx     # Navigation bar
│   ├── Services.tsx   # Services section
│   ├── About.tsx      # About section
│   ├── ContactForm.tsx # Contact form
│   └── Footer.tsx     # Footer section
├── hooks/             # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/               # Utility functions
│   └── utils.ts       # cn() helper for className merging
├── App.tsx            # Root app component (routing setup)
├── main.tsx           # Application entry point
└── index.css          # Global styles with Tailwind directives
```

### Key Architectural Patterns

**Path Aliases**: All imports use `@/` prefix mapped to `./src/` directory
- Example: `import { Button } from "@/components/ui/button"`

**App Structure**:
- `App.tsx` configures React Router, TanStack Query, toast notifications, and tooltip providers
- `Index.tsx` is the main landing page that composes all sections in order
- All routes must be added in `App.tsx` ABOVE the catch-all `*` route (see comment in file)

**Component Pattern**:
- shadcn/ui components live in `src/components/ui/` and are managed via components.json
- Custom business logic components are in `src/components/`
- Single-page sections are composed together in `pages/Index.tsx`

**Styling**:
- Uses Tailwind CSS with custom theme configuration in `tailwind.config.ts`
- `cn()` utility from `@/lib/utils` merges Tailwind classes properly
- Custom animations defined in Tailwind config (e.g., `animate-fade-in`)

**P5.js Integration**:
- Hero component uses P5.js for interactive canvas effects (dirt/fog layer that clears on mouse movement)
- P5 instance is stored in a ref and cleaned up on unmount
- Canvas overlays video background with layered z-index approach

**TypeScript Configuration**:
- Relaxed strictness settings: `noImplicitAny: false`, `strictNullChecks: false`
- Path aliases configured for `@/*` imports

## shadcn/ui Component Management

This project uses shadcn/ui components. Configuration is in `components.json`:
- Style: `default`
- Base color: `slate`
- Components directory: `@/components/ui`

To add new shadcn/ui components, use the CLI (not included in this repo, install separately):
```bash
npx shadcn@latest add [component-name]
```

## Routing

- Single-page application with React Router v6
- Main page route: `/` renders `Index.tsx`
- 404 route: `*` renders `NotFound.tsx`
- **Important**: Add new routes BEFORE the catch-all `*` route in `App.tsx` (line 20)

## Styling Conventions

- Use Tailwind utility classes for styling
- Use `cn()` from `@/lib/utils` for conditional class merging
- Custom colors and animations defined in `tailwind.config.ts`
- Mobile-first responsive design (use `md:`, `lg:` breakpoints)

## Forms and Validation

- Use React Hook Form for form management
- Use Zod for schema validation
- Use `@hookform/resolvers` to connect Zod with React Hook Form

## State Management

- **Server state**: TanStack Query (React Query) configured in `App.tsx`
- **Client state**: React hooks (useState, useContext as needed)
- **Form state**: React Hook Form

## Development Notes

- Dev server runs with `lovable-tagger` plugin (component tagging for Lovable.dev platform)
- Development mode uses port 8080
- Project is Lovable.dev integrated (see README.md for project URL)
