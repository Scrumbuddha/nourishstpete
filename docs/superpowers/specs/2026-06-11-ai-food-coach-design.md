# AI Food Coach — Design Spec

Date: 2026-06-11

## Summary

Activate the already-scaffolded AI Food Coach by fixing the model configuration and
adding the required API key. The UI and API route are complete; only three small
changes are needed.

## Scope

This spec covers making the coach functional for local development. It does not cover
deployment secrets management, streaming responses, or UI enhancements (deferred to
a later phase).

## Changes

### 1. API route — model and thinking

File: `app/api/coach/route.ts`

- Change the `MODEL` default from `claude-opus-4-8` to `claude-sonnet-4-6`. Sonnet
  is faster, cheaper, and fully capable for food Q&A.
- Remove `thinking: { type: "adaptive" }` from the `client.messages.create` call.
  Adaptive thinking is not supported on Sonnet and is unnecessary for this use case.

### 2. System prompt — plain text output

Add one rule to the `SYSTEM_PROMPT` constant in `app/api/coach/route.ts`:

> Do not use markdown formatting — no bullet symbols, no asterisks, no headers.
> Write in plain sentences and short paragraphs.

The chat UI renders plain text; markdown symbols would appear as raw characters.

### 3. Environment variable

Create `.env.local` at the project root:

```
# Get your key at https://console.anthropic.com
ANTHROPIC_API_KEY=your_key_here
```

Update `README.md` to document that this file is required to use the Coach feature,
and that the Finder, Swaps, and Recipes pages work without it.

## Out of Scope

- Streaming responses
- Markdown rendering
- Deployment / production secrets management
- UI changes
