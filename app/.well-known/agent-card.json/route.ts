import data from "../../../data.json";

export const dynamic = "force-static";

/**
 * A2A Agent Card per the A2A Protocol Specification.
 * https://a2a-protocol.org/latest/specification/
 *
 * This site is a personal links hub rather than a conversational agent,
 * so the card advertises a read-only "directory" agent that can answer
 * questions about Luis C.'s projects and social profiles.
 */
export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://lucataco.dev";

  const card = {
    name: `${data.name} Links Agent`,
    version: "1.0.0",
    description: `Read-only directory agent for ${data.name} (${data.desc}). Provides structured access to projects, referral links, and social profiles.`,
    url: siteUrl,
    provider: {
      organization: "CatacoLabs",
      url: "https://catacolabs.com",
    },
    documentationUrl: `${siteUrl}/llms.txt`,
    supportedInterfaces: [
      {
        url: siteUrl,
        transport: "https",
        contentTypes: ["text/html", "text/markdown"],
        description:
          "Homepage with HTML for browsers and markdown via Accept: text/markdown.",
      },
      {
        url: `${siteUrl}/.well-known/api-catalog`,
        transport: "https",
        contentTypes: ["application/linkset+json"],
        description: "RFC 9727 API catalog linking all discovery resources.",
      },
    ],
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["application/json", "text/markdown"],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    skills: [
      {
        id: "list-links",
        name: "List Links",
        description:
          "Return the full catalog of projects, referrals, and social profiles as structured JSON.",
        tags: ["directory", "links", "profile"],
        inputModes: ["text/plain"],
        outputModes: ["application/json"],
        examples: [
          "What projects has Luis built?",
          "Give me all of Luis's links.",
        ],
      },
      {
        id: "get-profile",
        name: "Get Profile",
        description:
          "Return profile information (name, description, avatar, social accounts).",
        tags: ["profile", "about"],
        inputModes: ["text/plain"],
        outputModes: ["application/json", "text/markdown"],
        examples: ["Who is Luis C.?", "What does Luis do?"],
      },
      {
        id: "find-link",
        name: "Find Link",
        description:
          "Search the link catalog by title or keyword and return matching entries with URLs.",
        tags: ["search", "links"],
        inputModes: ["text/plain"],
        outputModes: ["application/json"],
        examples: [
          "Find the Replicate link.",
          "Where can I sponsor Luis on GitHub?",
        ],
      },
    ],
  };

  return new Response(JSON.stringify(card, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
