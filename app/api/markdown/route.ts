import { NextRequest } from "next/server";
import data from "../../../data.json";

// Middleware has already gated on Accept: text/markdown, so the body is
// a static rendering of data.json. Keep it static for edge caching.
export const dynamic = "force-static";

function buildMarkdown(): string {
  const lines: string[] = [];

  lines.push(`# ${data.name}`);
  lines.push("");
  lines.push(`> ${data.desc}`);
  lines.push("");

  // Active / featured links
  const active = data.links.filter(
    (l: any) => !l.discontinued && !l.acquired
  );
  if (active.length) {
    lines.push("## Links");
    lines.push("");
    for (const link of active as Array<{ title: string; href: string }>) {
      lines.push(`- [${link.title}](${link.href})`);
    }
    lines.push("");
  }

  // Acquired projects
  const acquired = data.links.filter((l: any) => l.acquired);
  if (acquired.length) {
    lines.push("## Acquired Projects");
    lines.push("");
    for (const link of acquired as Array<{ title: string; href: string }>) {
      lines.push(`- [${link.title}](${link.href}) (acquired)`);
    }
    lines.push("");
  }

  // Discontinued / archived
  const discontinued = data.links.filter((l: any) => l.discontinued);
  if (discontinued.length) {
    lines.push("## Discontinued / Archived");
    lines.push("");
    for (const link of discontinued as Array<{ title: string; href: string }>) {
      lines.push(`- [${link.title}](${link.href}) (discontinued)`);
    }
    lines.push("");
  }

  // Socials
  if (data.socials?.length) {
    lines.push("## Social Profiles");
    lines.push("");
    for (const s of data.socials as Array<{ title: string; href: string }>) {
      lines.push(`- [${s.title}](${s.href})`);
    }
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push("Agent discovery resources:");
  lines.push("");
  lines.push("- API catalog: `/.well-known/api-catalog`");
  lines.push("- A2A agent card: `/.well-known/agent-card.json`");
  lines.push("- Agent skills index: `/.well-known/agent-skills/index.json`");
  lines.push("");

  return lines.join("\n");
}

export function GET(_req: NextRequest) {
  const md = buildMarkdown();
  // Rough token estimate: ~4 chars per token
  const tokenEstimate = Math.ceil(md.length / 4);

  return new Response(md, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenEstimate),
      Vary: "Accept",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "Access-Control-Allow-Origin": "*",
      Link:
        '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", ' +
        '</.well-known/agent-card.json>; rel="https://a2a-protocol.org/rels/agent-card"',
    },
  });
}
