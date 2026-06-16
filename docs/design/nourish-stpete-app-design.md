# NourishStPete — Product Design

## Problem

St. Petersburg residents with limited budgets face two connected problems: they don't know where to find free or low-cost healthy food nearby, and the food they can afford at corner stores and discount grocers is often high in sugar and sodium. Public benefit programs like SNAP, WIC, and Fresh Access Bucks exist to help, but awareness is low and navigating them is confusing.

## Goal

Give St. Pete residents a fast, no-login tool that answers three questions:

1. Where can I get food near me — especially free food and SNAP/EBT-accepted places?
2. What cheaper, healthier swaps exist for what I already buy?
3. What can I cook on a tight budget?

## Users

Primary: St. Pete residents earning below 200% of the federal poverty line — working families, seniors on fixed incomes, and anyone using SNAP/EBT or WIC benefits.

Secondary: Caseworkers, community health workers, and volunteers at pantries and social service agencies who refer clients to food resources.

## Features

### Find Food (`/finder`)

A filterable list of food resources in St. Petersburg. Types covered:

- Grocery stores (including those accepting SNAP/EBT and Fresh Access Bucks)
- Farmers markets
- Food pantries and free food distributions
- Mobile markets and pop-up pantries
- Community gardens

Filters: benefit type (SNAP/EBT, WIC, Fresh Access Bucks, Free), place type.

Each listing shows: name, type, address, hours, benefit badges, map link, and notes. No account or location permission required — listings are manually curated and updated via a daily AI research routine.

### Smart Swaps (`/swaps`)

Side-by-side comparison of a common grocery item and a cheaper, healthier alternative. For each swap:

- Per-serving cost delta
- Added sugar, sodium, fiber, and protein comparison
- Plain-language rationale

Categories: Breakfast, Drinks, Protein, Sides & Snacks, Bread & Grains, Dairy, Condiments, Frozen meals.

### Budget Recipes (`/recipes`)

Meals under $2.00 per serving, filterable by cost and diet tags. Tags: vegetarian, high-fiber, high-protein, low-sugar, kid-friendly, quick (under 30 min), no-stove.

Each recipe includes: cost per serving, total time, servings, ingredient list, and step-by-step instructions.

### AI Food Coach (`/coach`)

A conversational assistant powered by Claude (claude-sonnet-4-6) that helps users with food questions specific to their situation. The Coach can:

- Search the app's place listings to answer "where can I use EBT near me?"
- Pull Smart Swap data to suggest healthier alternatives
- Pull Budget Recipes to suggest meals

The Coach gives general food information only — not medical or dietary advice. No conversation history is stored. Requires an Anthropic API key (`ANTHROPIC_API_KEY` in `.env.local`); the other three features work without it.

## Data

All data lives in `lib/data/` as TypeScript seed files:

| File | Contents |
|---|---|
| `places.ts` | 32+ food resource listings for the St. Pete pilot area |
| `foods.ts` | ~40 food items with per-serving cost and nutrition figures |
| `recipes.ts` | 56+ budget recipes |

Prices in `foods.ts` are band midpoints from local price surveys. Nutrition figures are based on USDA FoodData Central. Place listings are verified via 211 Tampa Bay, Feeding Tampa Bay, and local sources; they should be re-verified before any public launch.

A daily Claude Routine searches for new food resources and emails findings as a Gmail draft for manual review before anything is added to the codebase.

## Technical Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Anthropic SDK (`@anthropic-ai/sdk`), claude-sonnet-4-6 |
| Hosting | Vercel (planned) |
| Repo | GitHub — `Scrumbuddha/nourishstpete`, branch `master` |

The Coach API route (`app/api/coach/route.ts`) uses a tool-use loop (max 5 iterations) with three tools: `search_places`, `get_swaps`, `get_recipes`.

## Design Principles

**No friction.** No account, no sign-up, no location permission required. A person in a food emergency should get an answer in under 30 seconds.

**Plain language.** The Coach enforces plain-text output — no markdown bullets or headers in responses. All UI copy avoids jargon.

**Privacy by default.** No analytics, no tracking, no conversation storage. Coach messages are sent to the Anthropic API and discarded.

**Accurate over complete.** A listing with unconfirmed hours gets a "call ahead" note rather than a best guess. Uncertainty is shown, not hidden.

## Phase 2 Roadmap

- Move seed data to Postgres with a scheduled ingestion pipeline (USDA FoodData Central, SNAP retailer dataset, Open Food Facts)
- Add map view to the Finder (leaflet.js or Mapbox GL)
- Add "open now" filter using live hours data
- SMS interface for users without smartphones (Twilio)
- Expand beyond St. Pete to other Pinellas County cities
