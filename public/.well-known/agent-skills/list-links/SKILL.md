# List Links

Return the full catalog of Luis C.'s projects, referrals, and social profiles
as a structured list.

## When to use

Use this skill when an agent or user wants to enumerate all available links
published on https://lucataco.dev — including active projects, discontinued
projects, acquired projects, and referral links.

## How to use

1. Fetch `https://lucataco.dev/` with header `Accept: text/markdown` to get a
   human/agent-readable markdown index, or
2. Fetch `https://lucataco.dev/.well-known/api-catalog` to discover the full
   set of machine-readable resources, or
3. Parse the JSON-LD `@graph` from the homepage HTML for structured data.

## Output

Each link entry includes:

- `title` — display name
- `href` — canonical URL
- `status` — one of `active`, `discontinued`, or `acquired`

## Example

```
- [Replicate Models](https://replicate.com/lucataco) — active
- [GitHub Sponsors](https://github.com/sponsors/lucataco/) — active
- [profilepics.ai](https://profilepics.ai) — acquired
```
