# BeachesStPete Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Next.js web application serving as a comprehensive beach resource guide with water quality, amenities, events, and nearby dining/lodging information for St. Petersburg, Florida.

**Architecture:** Standalone Next.js 16 project following NourishStPete patterns. Data-driven design with JSON files for static content (beaches, amenities, restaurants, hotels, events) and API integrations for dynamic content (water quality). Server-side rendering for SEO and performance. Modular React components with TypeScript for type safety.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, JSON data files

## Global Constraints

- Framework: Next.js 16.2.9 or later
- React: 19.2.4 or later
- Language: TypeScript 5+
- Styling: Tailwind CSS v4
- Data format: JSON files in `/data` directory
- Type safety: Full TypeScript coverage, no `any` types
- Responsive design: Mobile-first, WCAG 2.1 AA accessibility
- Performance: Homepage load time < 2 seconds
- Structure: Follow NourishStPete directory patterns and conventions

---

## Phase 1: Project Setup & Infrastructure

### Task 1: Create BeachesStPete Next.js Project

**Files:**
- Create: `C:\Users\mark\projects\BeachesStPete/package.json`
- Create: `C:\Users\mark\projects\BeachesStPete/tsconfig.json`
- Create: `C:\Users\mark\projects\BeachesStPete/next.config.ts`
- Create: `C:\Users\mark\projects\BeachesStPete/tailwind.config.ts`
- Create: `C:\Users\mark\projects\BeachesStPete/postcss.config.js`
- Create: `C:\Users\mark\projects\BeachesStPete/.gitignore`
- Create: `C:\Users\mark\projects\BeachesStPete/README.md`

**Interfaces:**
- Produces: Base Next.js project structure with all tooling configured

- [ ] **Step 1: Create project directory structure**

```bash
mkdir -p "C:\Users\mark\projects\BeachesStPete"
cd "C:\Users\mark\projects\BeachesStPete"
git init
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "beaches-st-pete",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.104.1",
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "typescript": "^5"
  }
}
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
};

export default config;
```

- [ ] **Step 5: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Create postcss.config.js**

```javascript
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 7: Create .gitignore**

```
node_modules
.next
dist
build
.env
.env.local
.DS_Store
*.log
.idea
.vscode
```

- [ ] **Step 8: Create README.md**

```markdown
# BeachesStPete

A comprehensive beach resource guide for St. Petersburg, Florida.

## Features

- Beach directory with detailed information
- Real-time water quality status and closures
- Amenities finder with filtering
- Nearby restaurants, hotels, and motels
- Beach events calendar
- Safety information and alerts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app directory (pages and layout)
- `/components` - React components
- `/data` - JSON data files
- `/lib` - Utility functions and types
- `/public` - Static assets
```

- [ ] **Step 9: Initialize git and make first commit**

```bash
cd "C:\Users\mark\projects\BeachesStPete"
git add .
git commit -m "init: set up Next.js project with TypeScript and Tailwind

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Phase 2: Data Structure & TypeScript Types

### Task 2: Define TypeScript Types for All Data Models

**Files:**
- Create: `lib/types.ts`

**Interfaces:**
- Produces: Complete TypeScript type definitions for beaches, amenities, restaurants, hotels, events, water quality, closures

- [ ] **Step 1: Create lib/types.ts with all type definitions**

```typescript
export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ContactInfo {
  phone?: string;
  website?: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Beach {
  id: string;
  name: string;
  location: Location;
  address: string;
  description: string;
  photos: string[];
  amenities: string[]; // amenity IDs
  contact: ContactInfo;
}

export interface WaterQualityStatus {
  beachId: string;
  status: "safe" | "caution" | "closed";
  lastUpdated: string;
  reason?: string;
  closureEnd?: string;
}

export type WaterStatusType = "safe" | "caution" | "closed";

export interface Closure {
  id: string;
  beachId: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: "active" | "historical";
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  nearbyBeachIds: string[];
  rating: number;
  hours: string;
  address: string;
  phone: string;
  website?: string;
}

export interface Hotel {
  id: string;
  name: string;
  type: "hotel" | "motel";
  nearbyBeachIds: string[];
  rating: number;
  priceRange: string;
  amenities: string[];
  address: string;
  phone: string;
  bookingLink?: string;
}

export type Venue = Restaurant | Hotel;

export interface Event {
  id: string;
  name: string;
  beachId: string;
  date: string;
  time: string;
  description: string;
  organizer: string;
}

export interface FilterOptions {
  amenities: string[];
  waterQuality?: WaterStatusType;
  accessibility?: boolean;
  venueType?: "restaurant" | "hotel" | "motel";
}
```

- [ ] **Step 2: Commit the types file**

```bash
git add lib/types.ts
git commit -m "types: define TypeScript interfaces for all data models

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 3: Create Sample Data Files

**Files:**
- Create: `data/beaches.json`
- Create: `data/amenities.json`
- Create: `data/restaurants.json`
- Create: `data/hotels.json`
- Create: `data/events.json`
- Create: `data/water-quality.json`
- Create: `data/closures.json`

**Interfaces:**
- Produces: Sample JSON data files populated with initial St. Petersburg beach data

- [ ] **Step 1: Create data/amenities.json with core amenities**

```json
[
  {
    "id": "parking",
    "name": "Parking",
    "icon": "🅿️",
    "description": "Parking available"
  },
  {
    "id": "lifeguards",
    "name": "Lifeguards",
    "icon": "🏖️",
    "description": "Lifeguards on duty"
  },
  {
    "id": "restrooms",
    "name": "Restrooms",
    "icon": "🚻",
    "description": "Public restrooms"
  },
  {
    "id": "showers",
    "name": "Showers",
    "icon": "🚿",
    "description": "Rinse showers available"
  },
  {
    "id": "wheelchair-access",
    "name": "Wheelchair Access",
    "icon": "♿",
    "description": "Wheelchair accessible"
  },
  {
    "id": "rentals",
    "name": "Equipment Rentals",
    "icon": "🏄",
    "description": "Equipment rentals available"
  },
  {
    "id": "pet-friendly",
    "name": "Pet-Friendly",
    "icon": "🐕",
    "description": "Pets allowed"
  },
  {
    "id": "picnic-area",
    "name": "Picnic Area",
    "icon": "🧺",
    "description": "Picnic tables and grills"
  }
]
```

- [ ] **Step 2: Create data/beaches.json with initial beaches**

```json
[
  {
    "id": "treasure-island",
    "name": "Treasure Island Beach",
    "location": {
      "lat": 27.7617,
      "lng": -82.7554
    },
    "address": "Treasure Island, St. Petersburg, FL 33706",
    "description": "Popular family beach with calm waters, excellent amenities, and a vibrant atmosphere. Known for watersports and beach activities.",
    "photos": [
      "/images/beaches/treasure-island-1.jpg"
    ],
    "amenities": [
      "parking",
      "lifeguards",
      "restrooms",
      "showers",
      "rentals",
      "picnic-area"
    ],
    "contact": {
      "phone": "(727) 893-7211",
      "website": "https://www.stpete.org/beaches"
    }
  },
  {
    "id": "clearwater-beach",
    "name": "Clearwater Beach",
    "location": {
      "lat": 27.975,
      "lng": -82.8300
    },
    "address": "Clearwater, FL 33755",
    "description": "Award-winning beach with pristine white sand and clear waters. Excellent for families and swimmers.",
    "photos": [
      "/images/beaches/clearwater-beach-1.jpg"
    ],
    "amenities": [
      "parking",
      "lifeguards",
      "restrooms",
      "showers",
      "wheelchair-access",
      "rentals",
      "picnic-area"
    ],
    "contact": {
      "phone": "(727) 562-4069",
      "website": "https://www.visitclearwater.com"
    }
  },
  {
    "id": "pass-a-grille",
    "name": "Pass-a-Grille Beach",
    "location": {
      "lat": 27.6283,
      "lng": -82.7319
    },
    "address": "Pass-a-Grille, St. Pete Beach, FL 33706",
    "description": "Historic beach at the southern tip of Pinellas County. Quieter atmosphere with good amenities.",
    "photos": [
      "/images/beaches/pass-a-grille-1.jpg"
    ],
    "amenities": [
      "parking",
      "lifeguards",
      "restrooms",
      "showers",
      "rentals"
    ],
    "contact": {
      "phone": "(727) 363-9245",
      "website": "https://www.stpete.org/beaches"
    }
  },
  {
    "id": "fort-de-soto",
    "name": "Fort De Soto Park Beaches",
    "location": {
      "lat": 27.5895,
      "lng": -82.7332
    },
    "address": "3500 Pinellas Bayway S, St. Petersburg, FL 33715",
    "description": "Large park with multiple beach areas. Great for families with excellent facilities and protected areas.",
    "photos": [
      "/images/beaches/fort-de-soto-1.jpg"
    ],
    "amenities": [
      "parking",
      "lifeguards",
      "restrooms",
      "showers",
      "wheelchair-access",
      "picnic-area",
      "pet-friendly"
    ],
    "contact": {
      "phone": "(727) 582-2267",
      "website": "https://www.pinellascounty.org"
    }
  }
]
```

- [ ] **Step 3: Create data/water-quality.json with initial status**

```json
[
  {
    "beachId": "treasure-island",
    "status": "safe",
    "lastUpdated": "2026-06-19T10:00:00Z",
    "reason": null,
    "closureEnd": null
  },
  {
    "beachId": "clearwater-beach",
    "status": "safe",
    "lastUpdated": "2026-06-19T10:00:00Z",
    "reason": null,
    "closureEnd": null
  },
  {
    "beachId": "pass-a-grille",
    "status": "caution",
    "lastUpdated": "2026-06-19T09:30:00Z",
    "reason": "Elevated bacteria levels",
    "closureEnd": "2026-06-21T00:00:00Z"
  },
  {
    "beachId": "fort-de-soto",
    "status": "safe",
    "lastUpdated": "2026-06-19T09:15:00Z",
    "reason": null,
    "closureEnd": null
  }
]
```

- [ ] **Step 4: Create data/closures.json with historical data**

```json
[
  {
    "id": "closure-001",
    "beachId": "pass-a-grille",
    "reason": "Elevated bacteria levels",
    "startDate": "2026-06-19T00:00:00Z",
    "endDate": "2026-06-21T00:00:00Z",
    "status": "active"
  },
  {
    "id": "closure-002",
    "beachId": "treasure-island",
    "reason": "Storm damage cleanup",
    "startDate": "2026-06-10T00:00:00Z",
    "endDate": "2026-06-12T00:00:00Z",
    "status": "historical"
  }
]
```

- [ ] **Step 5: Create data/restaurants.json with sample data**

```json
[
  {
    "id": "hurricane-seafood",
    "name": "Hurricane Seafood Restaurant",
    "cuisine": "Seafood",
    "nearbyBeachIds": ["treasure-island", "clearwater-beach"],
    "rating": 4.5,
    "hours": "11:00 AM - 10:00 PM",
    "address": "807 Gulf Way, St. Pete Beach, FL 33706",
    "phone": "(727) 360-9558",
    "website": "https://www.hurricaneseafood.com"
  },
  {
    "id": "sea-crestre",
    "name": "Sea Crestre Restaurant",
    "cuisine": "Italian, Seafood",
    "nearbyBeachIds": ["clearwater-beach"],
    "rating": 4.3,
    "hours": "5:00 PM - 10:00 PM",
    "address": "1 Beach Drive S, Clearwater, FL 33755",
    "phone": "(727) 441-1554",
    "website": "https://www.seacrestre.com"
  },
  {
    "id": "the-tavern",
    "name": "The Tavern at the Pass",
    "cuisine": "American, Casual",
    "nearbyBeachIds": ["pass-a-grille"],
    "rating": 4.2,
    "hours": "11:00 AM - 2:00 AM",
    "address": "2937 Pass-a-Grille Way, St. Pete Beach, FL 33706",
    "phone": "(727) 360-8887",
    "website": "https://www.tavernatthepass.com"
  },
  {
    "id": "paradise-cafe",
    "name": "Paradise Cafe",
    "cuisine": "Cuban, Latin",
    "nearbyBeachIds": ["fort-de-soto"],
    "rating": 4.4,
    "hours": "8:00 AM - 9:00 PM",
    "address": "3500 Pinellas Bayway S, St. Petersburg, FL 33715",
    "phone": "(727) 550-0000",
    "website": "https://www.paradisecafe.com"
  }
]
```

- [ ] **Step 6: Create data/hotels.json with sample data**

```json
[
  {
    "id": "island-resort",
    "name": "Island Resort Hotel",
    "type": "hotel",
    "nearbyBeachIds": ["treasure-island", "clearwater-beach"],
    "rating": 4.2,
    "priceRange": "$$$",
    "amenities": ["pool", "wifi", "fitness", "restaurant"],
    "address": "5250 Beach Drive, St. Pete Beach, FL 33706",
    "phone": "(727) 360-5551",
    "bookingLink": "https://www.islandresort.com"
  },
  {
    "id": "clearwater-motel",
    "name": "Budget Beach Motel",
    "type": "motel",
    "nearbyBeachIds": ["clearwater-beach"],
    "rating": 3.8,
    "priceRange": "$",
    "amenities": ["parking", "wifi"],
    "address": "609 S Gulfview Boulevard, Clearwater, FL 33755",
    "phone": "(727) 446-5115",
    "bookingLink": "https://www.budgetbeachmotel.com"
  },
  {
    "id": "beach-plaza",
    "name": "Beach Plaza Hotel",
    "type": "hotel",
    "nearbyBeachIds": ["pass-a-grille"],
    "rating": 4.0,
    "priceRange": "$$",
    "amenities": ["pool", "wifi", "restaurant"],
    "address": "1400 Gulf Boulevard, Clearwater, FL 33755",
    "phone": "(727) 441-1800",
    "bookingLink": "https://www.beachplazahotel.com"
  },
  {
    "id": "budget-stay",
    "name": "Budget Stay Motel",
    "type": "motel",
    "nearbyBeachIds": ["fort-de-soto"],
    "rating": 3.5,
    "priceRange": "$",
    "amenities": ["parking", "pool"],
    "address": "5000 Pinellas Point Drive S, St. Petersburg, FL 33715",
    "phone": "(727) 867-1900",
    "bookingLink": "https://www.budgetstay.com"
  }
]
```

- [ ] **Step 7: Create data/events.json with sample data**

```json
[
  {
    "id": "event-001",
    "name": "Sunset Beach Yoga",
    "beachId": "treasure-island",
    "date": "2026-06-20",
    "time": "6:00 PM",
    "description": "Relaxing yoga session on the beach at sunset. Bring your own mat.",
    "organizer": "St. Pete Beach Wellness"
  },
  {
    "id": "event-002",
    "name": "Clearwater Jazz Festival",
    "beachId": "clearwater-beach",
    "date": "2026-06-22",
    "time": "7:00 PM",
    "description": "Live jazz music and local food vendors.",
    "organizer": "Clearwater Events"
  },
  {
    "id": "event-003",
    "name": "Beach Cleanup Day",
    "beachId": "pass-a-grille",
    "date": "2026-06-25",
    "time": "9:00 AM",
    "description": "Community beach cleanup. All volunteers welcome!",
    "organizer": "Pinellas County Parks"
  },
  {
    "id": "event-004",
    "name": "Sandcastle Competition",
    "beachId": "fort-de-soto",
    "date": "2026-06-28",
    "time": "10:00 AM",
    "description": "Annual sandcastle building competition for all ages.",
    "organizer": "Fort De Soto Park"
  }
]
```

- [ ] **Step 8: Commit all data files**

```bash
git add data/
git commit -m "data: add initial beach, restaurant, hotel, and event data

Includes sample data for 4 major St. Pete area beaches, amenities,
restaurants, hotels, events, water quality status, and closures.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Phase 3: Data Loading & Utility Functions

### Task 4: Create Data Loading Utilities

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Consumes: JSON data files from `/data` directory, TypeScript types from `lib/types.ts`
- Produces: Functions to load and filter data: `loadBeaches()`, `loadAmenities()`, `loadRestaurants()`, `loadHotels()`, `loadEvents()`, `loadWaterQuality()`, `loadClosures()`, `getBeachById()`, `getNearbyVenues()`, `getWaterQualityForBeach()`, `getActiveClosures()`, `getEventsByBeach()`

- [ ] **Step 1: Create lib/data.ts with data loading functions**

```typescript
import {
  Beach,
  Amenity,
  Restaurant,
  Hotel,
  Event,
  WaterQualityStatus,
  Closure,
  Venue,
} from "./types";
import beachesData from "@/data/beaches.json";
import amenitiesData from "@/data/amenities.json";
import restaurantsData from "@/data/restaurants.json";
import hotelsData from "@/data/hotels.json";
import eventsData from "@/data/events.json";
import waterQualityData from "@/data/water-quality.json";
import closuresData from "@/data/closures.json";

export function loadBeaches(): Beach[] {
  return beachesData as Beach[];
}

export function loadAmenities(): Amenity[] {
  return amenitiesData as Amenity[];
}

export function loadRestaurants(): Restaurant[] {
  return restaurantsData as Restaurant[];
}

export function loadHotels(): Hotel[] {
  return hotelsData as Hotel[];
}

export function loadEvents(): Event[] {
  return eventsData as Event[];
}

export function loadWaterQuality(): WaterQualityStatus[] {
  return waterQualityData as WaterQualityStatus[];
}

export function loadClosures(): Closure[] {
  return closuresData as Closure[];
}

export function getBeachById(id: string): Beach | undefined {
  return loadBeaches().find((beach) => beach.id === id);
}

export function getAmenityById(id: string): Amenity | undefined {
  return loadAmenities().find((amenity) => amenity.id === id);
}

export function getWaterQualityForBeach(
  beachId: string
): WaterQualityStatus | undefined {
  return loadWaterQuality().find((wq) => wq.beachId === beachId);
}

export function getActiveClosures(): Closure[] {
  return loadClosures().filter((closure) => closure.status === "active");
}

export function getClosuresForBeach(beachId: string): Closure[] {
  return loadClosures().filter((closure) => closure.beachId === beachId);
}

export function getEventsByBeach(beachId: string): Event[] {
  return loadEvents().filter((event) => event.beachId === beachId);
}

export function getUpcomingEvents(daysAhead: number = 30): Event[] {
  const today = new Date();
  const futureDate = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return loadEvents().filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= futureDate;
  });
}

export function getNearbyVenues(beachId: string): Venue[] {
  const restaurants = loadRestaurants().filter((r) =>
    r.nearbyBeachIds.includes(beachId)
  );
  const hotels = loadHotels().filter((h) =>
    h.nearbyBeachIds.includes(beachId)
  );

  return [...(restaurants as Venue[]), ...(hotels as Venue[])];
}

export function getNearbyRestaurants(beachId: string): Restaurant[] {
  return loadRestaurants().filter((r) => r.nearbyBeachIds.includes(beachId));
}

export function getNearbyHotels(beachId: string): Hotel[] {
  return loadHotels().filter((h) => h.nearbyBeachIds.includes(beachId));
}

export function filterBeachesByAmenities(amenityIds: string[]): Beach[] {
  if (amenityIds.length === 0) return loadBeaches();

  return loadBeaches().filter((beach) =>
    amenityIds.every((amenityId) => beach.amenities.includes(amenityId))
  );
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(timeString: string): string {
  return timeString;
}

export function getWaterQualityColor(status: string): string {
  switch (status) {
    case "safe":
      return "bg-green-100 text-green-800";
    case "caution":
      return "bg-yellow-100 text-yellow-800";
    case "closed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getWaterQualityIcon(status: string): string {
  switch (status) {
    case "safe":
      return "✅";
    case "caution":
      return "⚠️";
    case "closed":
      return "❌";
    default:
      return "❓";
  }
}
```

- [ ] **Step 2: Commit data loading utilities**

```bash
git add lib/data.ts
git commit -m "util: add data loading and filtering functions

Provides utilities for loading and filtering beaches, amenities, restaurants,
hotels, events, water quality, and closures. Includes helper functions for
formatting and display logic.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Phase 4: Core UI Components

### Task 5: Build Shared & Layout Components

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/Navigation.tsx`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

**Interfaces:**
- Consumes: TypeScript types, Tailwind CSS
- Produces: Reusable header, footer, navigation components, and global app layout

- [ ] **Step 1: Create app/globals.css with global styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #1f2937;
  background-color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  @apply text-3xl font-bold text-gray-900 mb-8;
}

.card {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow;
}
```

- [ ] **Step 2: Create components/Navigation.tsx**

```typescript
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-ocean-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🏖️ BeachesStPete
        </Link>
        <div className="space-x-6 flex">
          <Link href="/" className="hover:text-ocean-100 transition">
            Home
          </Link>
          <Link href="/events" className="hover:text-ocean-100 transition">
            Events
          </Link>
          <Link href="/dining-lodging" className="hover:text-ocean-100 transition">
            Dining & Lodging
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Create components/Header.tsx**

```typescript
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function Header({ title, description, children }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {description && <p className="text-lg opacity-90">{description}</p>}
        {children}
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Create components/Footer.tsx**

```typescript
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BeachesStPete</h3>
            <p className="text-gray-400">
              Your guide to St. Petersburg beaches
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-white">
                  Events
                </a>
              </li>
              <li>
                <a href="/dining-lodging" className="hover:text-white">
                  Dining & Lodging
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Water Quality
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Beach Rules
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">St. Petersburg, FL</p>
            <p className="text-gray-400 text-sm mt-4">
              For water quality alerts, visit NOAA.gov
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} BeachesStPete. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Create app/layout.tsx**

```typescript
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeachesStPete - St. Petersburg Beach Guide",
  description:
    "Discover St. Petersburg beaches with water quality info, amenities, nearby restaurants, hotels, and events.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Commit layout and header components**

```bash
git add components/ app/layout.tsx app/globals.css
git commit -m "components: add navigation, header, footer, and global layout

Implements shared layout components with responsive navigation and footer.
Includes global styles and Tailwind configuration.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 6: Build Beach Card & Water Quality Components

**Files:**
- Create: `components/BeachCard.tsx`
- Create: `components/WaterQualityStatus.tsx`

**Interfaces:**
- Consumes: `Beach` type, `WaterQualityStatus` type, data utilities from `lib/data.ts`
- Produces: Reusable `BeachCard` component showing beach summary, `WaterQualityStatus` component with visual indicators

- [ ] **Step 1: Create components/WaterQualityStatus.tsx**

```typescript
import { WaterQualityStatus as WaterQualityStatusType } from "@/lib/types";
import { getWaterQualityIcon, getWaterQualityColor } from "@/lib/data";

interface WaterQualityStatusProps {
  status: WaterQualityStatusType;
  variant?: "compact" | "full";
}

export default function WaterQualityStatus({
  status,
  variant = "compact",
}: WaterQualityStatusProps) {
  const colorClass = getWaterQualityColor(status.status);
  const icon = getWaterQualityIcon(status.status);
  const lastUpdated = new Date(status.lastUpdated).toLocaleDateString();

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colorClass} text-sm font-semibold`}>
        <span>{icon}</span>
        <span className="capitalize">{status.status}</span>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg ${colorClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-bold text-lg capitalize">{status.status}</h3>
      </div>
      {status.reason && <p className="text-sm mb-2">{status.reason}</p>}
      <p className="text-xs opacity-75">Updated: {lastUpdated}</p>
      {status.closureEnd && (
        <p className="text-xs mt-2">
          Expected to reopen: {new Date(status.closureEnd).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create components/BeachCard.tsx**

```typescript
import Link from "next/link";
import { Beach } from "@/lib/types";
import { getWaterQualityForBeach, getAmenityById } from "@/lib/data";
import WaterQualityStatus from "./WaterQualityStatus";

interface BeachCardProps {
  beach: Beach;
}

export default function BeachCard({ beach }: BeachCardProps) {
  const waterQuality = getWaterQualityForBeach(beach.id);
  const amenityObjects = beach.amenities
    .map((id) => getAmenityById(id))
    .filter(Boolean);

  return (
    <Link href={`/beaches/${beach.id}`}>
      <div className="card p-6 cursor-pointer h-full flex flex-col">
        {beach.photos[0] && (
          <div className="mb-4 h-48 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={beach.photos[0]}
              alt={beach.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x200?text=" +
                  encodeURIComponent(beach.name);
              }}
            />
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-2">{beach.name}</h3>

        {waterQuality && (
          <div className="mb-3">
            <WaterQualityStatus status={waterQuality} variant="compact" />
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {beach.description}
        </p>

        {amenityObjects.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {amenityObjects.slice(0, 4).map((amenity) => (
              <span
                key={amenity?.id}
                className="text-sm bg-ocean-50 text-ocean-700 px-2 py-1 rounded"
                title={amenity?.description}
              >
                {amenity?.icon}
              </span>
            ))}
            {amenityObjects.length > 4 && (
              <span className="text-sm text-gray-500">
                +{amenityObjects.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Commit card components**

```bash
git add components/BeachCard.tsx components/WaterQualityStatus.tsx
git commit -m "components: add BeachCard and WaterQualityStatus components

Implements card-based display for beaches with water quality indicators.
Features responsive design and amenity icons.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 7: Build Filter & Amenities Components

**Files:**
- Create: `components/AmenitiesFilter.tsx`
- Create: `components/VenueCard.tsx`

**Interfaces:**
- Consumes: `Amenity` type, data utilities, callback for filter changes
- Produces: `AmenitiesFilter` component with multi-select checkboxes, `VenueCard` component for restaurants/hotels

- [ ] **Step 1: Create components/AmenitiesFilter.tsx**

```typescript
"use client";

import { Amenity } from "@/lib/types";
import { loadAmenities } from "@/lib/data";
import { useState } from "react";

interface AmenitiesFilterProps {
  onFilterChange: (amenityIds: string[]) => void;
}

export default function AmenitiesFilter({
  onFilterChange,
}: AmenitiesFilterProps) {
  const amenities = loadAmenities();
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (amenityId: string) => {
    const newSelected = selected.includes(amenityId)
      ? selected.filter((id) => id !== amenityId)
      : [...selected, amenityId];

    setSelected(newSelected);
    onFilterChange(newSelected);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Filter by Amenities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((amenity) => (
          <label
            key={amenity.id}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <input
              type="checkbox"
              checked={selected.includes(amenity.id)}
              onChange={() => handleToggle(amenity.id)}
              className="w-4 h-4 text-ocean-600 rounded"
            />
            <span className="text-xl">{amenity.icon}</span>
            <span className="text-gray-700">{amenity.name}</span>
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          onClick={() => {
            setSelected([]);
            onFilterChange([]);
          }}
          className="mt-4 text-sm text-ocean-600 hover:text-ocean-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create components/VenueCard.tsx**

```typescript
import { Restaurant, Hotel } from "@/lib/types";

type VenueCardProps = {
  venue: Restaurant | Hotel;
};

export default function VenueCard({ venue }: VenueCardProps) {
  const isRestaurant = "cuisine" in venue;
  const isHotel = "type" in venue;

  return (
    <div className="card p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-900 text-lg">{venue.name}</h4>
        {isHotel && (
          <span className="text-xs bg-ocean-100 text-ocean-700 px-2 py-1 rounded capitalize">
            {venue.type}
          </span>
        )}
      </div>

      {isRestaurant && (
        <p className="text-sm text-gray-600 mb-2">{venue.cuisine}</p>
      )}

      {isHotel && (
        <div className="mb-2">
          {venue.amenities && (
            <p className="text-xs text-gray-600">
              {venue.amenities.join(", ")}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <span className="text-yellow-500">★</span>
        <span className="text-sm font-semibold">{venue.rating}</span>
      </div>

      {isRestaurant && <p className="text-sm text-gray-600 mb-2">{venue.hours}</p>}

      {isHotel && (
        <p className="text-sm font-semibold text-ocean-600 mb-2">
          {venue.priceRange}
        </p>
      )}

      <p className="text-sm text-gray-600 mb-3">{venue.address}</p>

      <div className="flex gap-2 text-sm">
        <a
          href={`tel:${venue.phone}`}
          className="flex-1 bg-ocean-600 text-white px-3 py-2 rounded text-center hover:bg-ocean-700 transition"
        >
          Call
        </a>
        {venue.website && (
          <a
            href={venue.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-200 text-gray-900 px-3 py-2 rounded text-center hover:bg-gray-300 transition"
          >
            Website
          </a>
        )}
        {isHotel && venue.bookingLink && (
          <a
            href={venue.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-center hover:bg-green-700 transition"
          >
            Book
          </a>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit filter and venue components**

```bash
git add components/AmenitiesFilter.tsx components/VenueCard.tsx
git commit -m "components: add AmenitiesFilter and VenueCard components

Implements amenity filtering with multi-select checkboxes and
reusable venue card for displaying restaurants and hotels.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 8: Build Events & Safety Components

**Files:**
- Create: `components/EventsList.tsx`
- Create: `components/SafetyAlerts.tsx`
- Create: `components/NearbyVenues.tsx`

**Interfaces:**
- Consumes: `Event`, `Closure` types, `VenueCard` component
- Produces: `EventsList`, `SafetyAlerts`, `NearbyVenues` components

- [ ] **Step 1: Create components/EventsList.tsx**

```typescript
import { Event } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/data";

interface EventsListProps {
  events: Event[];
  title?: string;
}

export default function EventsList({
  events,
  title = "Upcoming Events",
}: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No upcoming events</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="card p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg text-gray-900">{event.name}</h4>
              <span className="text-sm bg-ocean-100 text-ocean-700 px-2 py-1 rounded">
                {formatDate(event.date)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              ⏰ {formatTime(event.time)}
            </p>
            <p className="text-sm text-gray-700 mb-2">{event.description}</p>
            <p className="text-xs text-gray-500">Organized by: {event.organizer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create components/SafetyAlerts.tsx**

```typescript
import { Closure } from "@/lib/types";
import { formatDate } from "@/lib/data";

interface SafetyAlertsProps {
  closures: Closure[];
}

export default function SafetyAlerts({ closures }: SafetyAlertsProps) {
  if (closures.length === 0) return null;

  return (
    <div className="space-y-3">
      {closures.map((closure) => (
        <div
          key={closure.id}
          className="bg-red-50 border-l-4 border-red-600 p-4 rounded"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-bold text-red-900">Beach Closure Alert</h3>
          </div>
          <p className="text-red-800 text-sm mb-2">{closure.reason}</p>
          <p className="text-red-700 text-xs">
            Closed: {formatDate(closure.startDate)} to {formatDate(closure.endDate)}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create components/NearbyVenues.tsx**

```typescript
import { Restaurant, Hotel } from "@/lib/types";
import VenueCard from "./VenueCard";

interface NearbyVenuesProps {
  restaurants: Restaurant[];
  hotels: Hotel[];
}

export default function NearbyVenues({
  restaurants,
  hotels,
}: NearbyVenuesProps) {
  return (
    <div className="space-y-8">
      {restaurants.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4">🍽️ Nearby Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.map((restaurant) => (
              <VenueCard key={restaurant.id} venue={restaurant} />
            ))}
          </div>
        </div>
      )}

      {hotels.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4">🏨 Hotels & Motels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map((hotel) => (
              <VenueCard key={hotel.id} venue={hotel} />
            ))}
          </div>
        </div>
      )}

      {restaurants.length === 0 && hotels.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No nearby restaurants or hotels found</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Commit events and safety components**

```bash
git add components/EventsList.tsx components/SafetyAlerts.tsx components/NearbyVenues.tsx
git commit -m "components: add EventsList, SafetyAlerts, and NearbyVenues

Implements event display with dates/times, alert banners for closures,
and nearby venue listing with filtering.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Phase 5: Pages & Routes

### Task 9: Build Homepage

**Files:**
- Create: `app/page.tsx`

**Interfaces:**
- Consumes: `BeachCard`, `AmenitiesFilter`, data utilities
- Produces: Homepage with beach grid, amenity filters, water quality overview

- [ ] **Step 1: Create app/page.tsx (homepage)**

```typescript
"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import BeachCard from "@/components/BeachCard";
import AmenitiesFilter from "@/components/AmenitiesFilter";
import { loadBeaches, filterBeachesByAmenities } from "@/lib/data";

export default function Home() {
  const allBeaches = loadBeaches();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const filteredBeaches = useMemo(
    () => filterBeachesByAmenities(selectedAmenities),
    [selectedAmenities]
  );

  return (
    <div>
      <Header
        title="St. Petersburg Beaches"
        description="Discover beautiful beaches with water quality info, amenities, events, and nearby dining"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <AmenitiesFilter onFilterChange={setSelectedAmenities} />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {filteredBeaches.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">
                  Showing {filteredBeaches.length} beach
                  {filteredBeaches.length !== 1 ? "es" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBeaches.map((beach) => (
                    <BeachCard key={beach.id} beach={beach} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No beaches match your selected amenities.
                </p>
                <button
                  onClick={() => setSelectedAmenities([])}
                  className="mt-4 text-ocean-600 hover:text-ocean-700 font-semibold"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit homepage**

```bash
git add app/page.tsx
git commit -m "page: add responsive homepage with beach grid and filtering

Features amenity-based filtering with real-time beach list updates.
Uses client-side state management for interactive filtering.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 10: Build Beach Detail Page

**Files:**
- Create: `app/beaches/[id]/page.tsx`

**Interfaces:**
- Consumes: Beach ID from route params, data utilities, all display components
- Produces: Full beach detail page with all information

- [ ] **Step 1: Create app/beaches/[id]/page.tsx**

```typescript
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import WaterQualityStatus from "@/components/WaterQualityStatus";
import SafetyAlerts from "@/components/SafetyAlerts";
import EventsList from "@/components/EventsList";
import NearbyVenues from "@/components/NearbyVenues";
import {
  getBeachById,
  getWaterQualityForBeach,
  getClosuresForBeach,
  getEventsByBeach,
  getNearbyRestaurants,
  getNearbyHotels,
  getAmenityById,
  loadBeaches,
} from "@/lib/data";

interface BeachDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const beaches = loadBeaches();
  return beaches.map((beach) => ({
    id: beach.id,
  }));
}

export default async function BeachDetailPage({
  params,
}: BeachDetailPageProps) {
  const { id } = await params;
  const beach = getBeachById(id);

  if (!beach) {
    notFound();
  }

  const waterQuality = getWaterQualityForBeach(beach.id);
  const closures = getClosuresForBeach(beach.id);
  const events = getEventsByBeach(beach.id);
  const restaurants = getNearbyRestaurants(beach.id);
  const hotels = getNearbyHotels(beach.id);
  const amenityObjects = beach.amenities
    .map((amenityId) => getAmenityById(amenityId))
    .filter(Boolean);

  return (
    <div>
      <Header
        title={beach.name}
        description={beach.address}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Image */}
        {beach.photos[0] && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg h-96">
            <img
              src={beach.photos[0]}
              alt={beach.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/800x300?text=" +
                  encodeURIComponent(beach.name);
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{beach.description}</p>
            </div>

            {/* Water Quality & Alerts */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Water Quality & Alerts</h2>
              {waterQuality ? (
                <div className="space-y-4">
                  <WaterQualityStatus status={waterQuality} variant="full" />
                  {closures.length > 0 && (
                    <SafetyAlerts closures={closures} />
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Water quality data not available</p>
              )}
            </div>

            {/* Events */}
            <div>
              <EventsList events={events} title="Events at this Beach" />
            </div>

            {/* Nearby Venues */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Nearby Dining & Lodging</h2>
              <NearbyVenues restaurants={restaurants} hotels={hotels} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Amenities */}
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4">Amenities</h3>
              <div className="space-y-2">
                {amenityObjects.length > 0 ? (
                  amenityObjects.map((amenity) => (
                    <div key={amenity?.id} className="flex items-center gap-2">
                      <span className="text-2xl">{amenity?.icon}</span>
                      <span className="text-gray-700">{amenity?.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No amenities listed</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              {beach.contact.phone && (
                <a
                  href={`tel:${beach.contact.phone}`}
                  className="block text-ocean-600 hover:text-ocean-700 mb-2"
                >
                  📞 {beach.contact.phone}
                </a>
              )}
              {beach.contact.website && (
                <a
                  href={beach.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-ocean-600 hover:text-ocean-700"
                >
                  🌐 Visit Website
                </a>
              )}
            </div>

            {/* Location */}
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <p className="text-gray-600 text-sm mb-2">{beach.address}</p>
              <p className="text-xs text-gray-500">
                Coordinates: {beach.location.lat.toFixed(4)},
                {beach.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit beach detail page**

```bash
git add app/beaches/
git commit -m "page: add beach detail page with full information

Displays complete beach info including water quality, amenities,
events, nearby restaurants/hotels, and contact information.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 11: Build Events Page

**Files:**
- Create: `app/events/page.tsx`

**Interfaces:**
- Consumes: Data utilities for events, `EventsList` component
- Produces: Events listing page with upcoming events

- [ ] **Step 1: Create app/events/page.tsx**

```typescript
import Header from "@/components/Header";
import EventsList from "@/components/EventsList";
import { getUpcomingEvents } from "@/lib/data";

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents(90);

  return (
    <div>
      <Header
        title="Beach Events"
        description="Discover upcoming events at St. Petersburg beaches"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <EventsList events={upcomingEvents} title="Upcoming Events (Next 90 Days)" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit events page**

```bash
git add app/events/page.tsx
git commit -m "page: add events listing page

Shows upcoming beach events with dates, times, and organizer info.
Filters to 90-day window for upcoming events.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 12: Build Dining & Lodging Page

**Files:**
- Create: `app/dining-lodging/page.tsx`

**Interfaces:**
- Consumes: `NearbyVenues` component, restaurant/hotel data
- Produces: Page listing all restaurants, hotels, and motels

- [ ] **Step 1: Create app/dining-lodging/page.tsx**

```typescript
"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import NearbyVenues from "@/components/NearbyVenues";
import { loadRestaurants, loadHotels } from "@/lib/data";

export default function DiningLodgingPage() {
  const restaurants = loadRestaurants();
  const hotels = loadHotels();
  const [filterType, setFilterType] = useState<"all" | "restaurant" | "hotel">("all");

  const filteredRestaurants = useMemo(
    () =>
      filterType === "all" || filterType === "restaurant" ? restaurants : [],
    [filterType, restaurants]
  );

  const filteredHotels = useMemo(
    () => (filterType === "all" || filterType === "hotel" ? hotels : []),
    [filterType, hotels]
  );

  return (
    <div>
      <Header
        title="Dining & Lodging"
        description="Discover restaurants, hotels, and motels near St. Petersburg beaches"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilterType("all")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filterType === "all"
                ? "bg-ocean-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType("restaurant")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filterType === "restaurant"
                ? "bg-ocean-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            🍽️ Restaurants ({restaurants.length})
          </button>
          <button
            onClick={() => setFilterType("hotel")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filterType === "hotel"
                ? "bg-ocean-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            🏨 Hotels & Motels ({hotels.length})
          </button>
        </div>

        {/* Venues */}
        <NearbyVenues
          restaurants={filteredRestaurants}
          hotels={filteredHotels}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit dining & lodging page**

```bash
git add app/dining-lodging/page.tsx
git commit -m "page: add dining and lodging discovery page

Lists all restaurants, hotels, and motels with filter by type.
Shows ratings, amenities, and booking/contact information.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Phase 6: Polish & Deployment

### Task 13: Add 404 Page & Metadata

**Files:**
- Create: `app/not-found.tsx`

**Interfaces:**
- Produces: Custom 404 page for routing

- [ ] **Step 1: Create app/not-found.tsx**

```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Beach Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the beach you're looking for. Maybe try exploring
          other beaches?
        </p>
        <Link
          href="/"
          className="inline-block bg-ocean-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-ocean-700 transition"
        >
          Back to Beaches
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit 404 page**

```bash
git add app/not-found.tsx
git commit -m "page: add custom 404 not found page

Provides helpful fallback when requested beach or page doesn't exist.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

### Task 14: Build & Test

**Files:**
- No new files

**Interfaces:**
- Tests: Build process, dev server startup, homepage navigation

- [ ] **Step 1: Install dependencies**

```bash
cd "C:\Users\mark\projects\BeachesStPete"
npm install
```

Expected: All dependencies installed successfully, node_modules created

- [ ] **Step 2: Run development server**

```bash
npm run dev
```

Expected: "ready - started server on 0.0.0.0:3000" or similar, dev server running

- [ ] **Step 3: Test homepage**

Visit `http://localhost:3000` in browser

Expected:
- Navigation bar visible with BeachesStPete logo
- Header with title "St. Petersburg Beaches"
- Beach grid showing 4 beaches (Treasure Island, Clearwater, Pass-a-Grille, Fort De Soto)
- Amenity filter sidebar on left with checkboxes
- Each beach card shows water quality status
- Filtering by amenities works (select "Parking", only beaches with parking show)
- Footer visible at bottom

- [ ] **Step 4: Test beach detail page**

Click on "Treasure Island Beach" card

Expected:
- Full beach information displayed
- Water quality status showing "Safe"
- Amenities section showing icons and names
- Contact information with phone/website
- Events list showing "Sunset Beach Yoga"
- Nearby venues (restaurants and hotels)
- Back navigation working

- [ ] **Step 5: Test events page**

Click "Events" in navigation

Expected:
- Shows list of upcoming events
- Each event has date, time, description, organizer
- 4 events listed (Sunset Yoga, Jazz Festival, Beach Cleanup, Sandcastle)

- [ ] **Step 6: Test dining & lodging page**

Click "Dining & Lodging" in navigation

Expected:
- Filter buttons (All, Restaurants, Hotels & Motels)
- Restaurant filter shows 4 restaurants
- Hotel filter shows 4 venues
- Each venue shows rating, contact, booking links
- Venue cards are clickable with call/website buttons

- [ ] **Step 7: Verify responsive design on mobile**

Resize browser to 375px width

Expected:
- Navigation stacks properly
- Beach grid shows single column
- Filter sidebar appears at top or side
- All buttons remain clickable
- Text remains readable

- [ ] **Step 8: Test build process**

```bash
npm run build
```

Expected: Build completes successfully without errors

- [ ] **Step 9: Final commit**

```bash
git add -A
git commit -m "build: complete BeachesStPete MVP

All features functional:
- Homepage with beach grid and amenity filtering
- Beach detail pages with water quality and events
- Events calendar (90-day upcoming)
- Dining & lodging discovery with filtering
- Responsive design for mobile and desktop
- Full TypeScript type safety
- Sample data for 4 beaches, 4 restaurants, 4 hotels

Ready for initial user testing.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Summary

This plan builds BeachesStPete as a complete, standalone Next.js application with:

✅ **Core Features:**
- Beach directory with water quality and closures
- Amenity-based filtering
- Events calendar
- Nearby restaurants, hotels, and motels
- Safety alerts and information

✅ **Technical Excellence:**
- Full TypeScript type coverage
- Server-side rendering for performance
- Responsive mobile-first design
- JSON-based data storage (easy to maintain)
- Component reusability
- Proper error handling (404 pages)

✅ **Deployment Ready:**
- Standalone project structure
- Build optimization via Next.js
- Static generation where possible
- Ready for deployment to Vercel or similar

Total estimated tasks: 14 (including setup, data, components, pages, and testing)

