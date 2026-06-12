# AI Food Coach Activation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Activate the already-scaffolded AI Food Coach by switching the model to Sonnet, removing the unsupported thinking parameter, enforcing plain-text output in the system prompt, and wiring up the API key.

**Architecture:** The coach is a Next.js API route (`app/api/coach/route.ts`) that calls the Anthropic SDK and returns a JSON `{ reply }` to the client-side chat UI. No structural changes needed — only configuration and prompt edits, plus a new `.env.local` file.

**Tech Stack:** Next.js 16, Anthropic SDK (`@anthropic-ai/sdk`), TypeScript, Tailwind CSS

---

### Task 1: Fix the API route (model, thinking, system prompt)

**Files:**
- Modify: `app/api/coach/route.ts`

- [ ] **Step 1: Update MODEL and remove thinking**

Open `app/api/coach/route.ts`. Make these two changes:

Change line 5 from:
```ts
const MODEL = process.env.COACH_MODEL ?? "claude-opus-4-8";
```
To:
```ts
const MODEL = process.env.COACH_MODEL ?? "claude-sonnet-4-6";
```

In the `client.messages.create` call (around line 156), remove the `thinking` line:
```ts
// REMOVE this line:
thinking: { type: "adaptive" },
```

The `messages.create` call should now look like:
```ts
response = await client.messages.create({
  model: MODEL,
  max_tokens: 2048,
  system: SYSTEM_PROMPT,
  tools,
  messages,
});
```

- [ ] **Step 2: Add plain-text rule to SYSTEM_PROMPT**

In the `SYSTEM_PROMPT` constant, append this sentence to the Rules section (after the last existing rule bullet):
```ts
- Do not use markdown formatting — no bullet symbols, no asterisks, no headers. Write in plain sentences and short paragraphs.
```

The end of `SYSTEM_PROMPT` should look like:
```ts
- Never recommend restriction diets, fasting, or weight-loss targets.
- Keep answers short and scannable. When listing places, include hours and what benefits they accept.
- Do not use markdown formatting — no bullet symbols, no asterisks, no headers. Write in plain sentences and short paragraphs.`;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run build
```

Expected: build succeeds with no type errors. (Warnings about `@types` or image optimization are fine.)

- [ ] **Step 4: Commit**

```bash
git add app/api/coach/route.ts
git commit -m "feat: switch coach to Sonnet, drop thinking, enforce plain text"
```

---

### Task 2: Create .env.local

**Files:**
- Create: `.env.local`

- [ ] **Step 1: Create the file**

Create `.env.local` at the project root with this content:

```
# Required to use the AI Food Coach (/coach).
# Get your key at https://console.anthropic.com
# The Finder, Swaps, and Recipes pages work without this key.
ANTHROPIC_API_KEY=your_key_here
```

- [ ] **Step 2: Confirm .env.local is gitignored**

Check `.gitignore` contains `.env*.local` or `.env.local`. If it does not, add the line:
```
.env.local
```

Next.js's default `.gitignore` already includes `.env*.local`, so this is likely already covered — just verify.

- [ ] **Step 3: Fill in your actual key**

Replace `your_key_here` with your real Anthropic API key from https://console.anthropic.com.

- [ ] **Step 4: Commit the .gitignore change only (not the key)**

Only stage `.gitignore` if it was changed. Do NOT stage `.env.local`.

```bash
git status   # verify .env.local is NOT listed as staged
# If .gitignore was changed:
git add .gitignore
git commit -m "chore: ensure .env.local is gitignored"
```

---

### Task 3: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add Running the Coach section**

In `README.md`, replace the Phase 2 note at the bottom:

```markdown
Phase 2 moves this into Postgres with scheduled ingestion from USDA
FoodData Central, the SNAP retailer dataset, and Open Food Facts, and adds
the Claude-powered AI Food Coach (see the design doc).
```

With:

```markdown
Phase 2 moves this into Postgres with scheduled ingestion from USDA
FoodData Central, the SNAP retailer dataset, and Open Food Facts.

## AI Food Coach

The `/coach` page requires an Anthropic API key. Create `.env.local` in the
project root:

```
ANTHROPIC_API_KEY=your_key_here
```

Get a key at https://console.anthropic.com. The Finder, Swaps, and Recipes
pages all work without it.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document ANTHROPIC_API_KEY requirement for the Coach"
```

---

### Task 4: Manual smoke test

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open http://localhost:3000/coach in a browser.

- [ ] **Step 2: Send a preset prompt**

Click "Where can I use EBT near me?" — the preset button. Expected:

- The message appears in the chat bubble on the right
- "Thinking…" appears briefly
- A plain-text reply appears (no `*`, `**`, `#`, or `-` bullet characters) listing places from the app's data

- [ ] **Step 3: Send a free-form message**

Type "What can I make with rice, beans, and frozen corn?" and hit Send. Expected:

- A plain-text reply with recipe suggestions
- No markdown symbols in the response

- [ ] **Step 4: Verify error state (optional)**

Temporarily rename `.env.local` to `.env.local.bak` and restart the dev server. Visit `/coach` and send a message. Expected: the amber error box appears with the message about missing `ANTHROPIC_API_KEY`. Rename back when done.
