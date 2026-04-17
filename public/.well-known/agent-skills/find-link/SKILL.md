# Find Link

Locate a specific link from Luis C.'s catalog by title or keyword.

## When to use

Use this skill when an agent or user is looking for a particular
project, referral, or social profile rather than the full directory.

## How to use

1. Fetch `https://lucataco.dev/` with `Accept: text/markdown` for a
   markdown list of all links.
2. Do a case-insensitive substring match on the link title.
3. Return the matching `href`.

Alternatively, when running in a browser that supports WebMCP, call the
exposed `find_link` tool via `navigator.modelContext` — it accepts a
`query` string and returns matching entries.

## Example

Query: "replicate" →
```json
{
  "title": "Replicate Models",
  "href": "https://replicate.com/lucataco",
  "status": "active"
}
```
