import data from "../../../data.json";

export const dynamic = "force-static";

/**
 * API Catalog per RFC 9727.
 * Returns application/linkset+json describing the machine-readable
 * resources this site publishes for agent consumption.
 *
 * Since this is a static personal linktree (not a traditional API), we
 * list the agent-discovery surfaces (markdown, skills index, agent card)
 * as the "APIs" available.
 */
export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://lucataco.dev";

  const linkset = {
    linkset: [
      {
        anchor: `${siteUrl}/`,
        "service-doc": [
          {
            href: `${siteUrl}/llms.txt`,
            type: "text/plain",
            title: "llms.txt — machine-readable site summary",
          },
          {
            href: `${siteUrl}/`,
            type: "text/markdown",
            title: "Homepage (markdown representation via Accept: text/markdown)",
            hreflang: ["en"],
          },
        ],
        status: [
          {
            href: `${siteUrl}/api/health`,
            type: "application/json",
            title: "Health endpoint",
          },
        ],
        describedby: [
          {
            href: `${siteUrl}/.well-known/agent-card.json`,
            type: "application/json",
            title: "A2A Agent Card",
          },
          {
            href: `${siteUrl}/.well-known/agent-skills/index.json`,
            type: "application/json",
            title: "Agent Skills discovery index",
          },
        ],
        author: [
          {
            href: siteUrl,
            title: data.name,
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
