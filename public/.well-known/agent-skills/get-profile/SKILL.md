# Get Profile

Retrieve Luis C.'s profile information — name, description, avatar, job
title, and linked social accounts.

## When to use

Use this skill when an agent needs basic identity information about the
site owner, for example to answer "who is Luis C.?" or to build an agent-
to-agent handshake referencing the profile.

## How to use

Fetch one of:

- `https://lucataco.dev/.well-known/agent-card.json` — A2A Agent Card
- `https://lucataco.dev/` with `Accept: text/markdown` — markdown summary
- `https://lucataco.dev/` HTML — contains embedded JSON-LD `Person` schema

## Fields returned

- `name` — display name
- `description` — short bio
- `avatar` — portrait image URL
- `jobTitle` — "Machine Learning Engineer"
- `sameAs` — array of social profile URLs (Twitter/X, GitHub, LinkedIn,
  Hugging Face, Weights & Biases)
