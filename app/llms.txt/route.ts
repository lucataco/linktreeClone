import data from "../../data.json";

export const dynamic = "force-static";

/**
 * llms.txt — a machine-readable summary of this site for LLMs / agents.
 * https://llmstxt.org/
 */
export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://lucataco.dev";

  const active = data.links.filter((l: any) => !l.discontinued && !l.acquired);
  const acquired = data.links.filter((l: any) => l.acquired);
  const discontinued = data.links.filter((l: any) => l.discontinued);

  const lines: string[] = [];
  lines.push(`# ${data.name}`);
  lines.push("");
  lines.push(`> ${data.desc}`);
  lines.push("");
  lines.push(
    `Personal links hub for ${data.name}, a Machine Learning Engineer. ` +
      `This site is static HTML with additional machine-readable surfaces ` +
      `for AI agents (markdown negotiation, RFC 9727 API catalog, A2A ` +
      `agent card, agent skills index).`
  );
  lines.push("");

  lines.push("## Active links");
  lines.push("");
  for (const l of active as Array<{ title: string; href: string }>) {
    lines.push(`- [${l.title}](${l.href})`);
  }
  lines.push("");

  if (acquired.length) {
    lines.push("## Acquired projects");
    lines.push("");
    for (const l of acquired as Array<{ title: string; href: string }>) {
      lines.push(`- [${l.title}](${l.href})`);
    }
    lines.push("");
  }

  if (discontinued.length) {
    lines.push("## Archived / discontinued");
    lines.push("");
    for (const l of discontinued as Array<{ title: string; href: string }>) {
      lines.push(`- [${l.title}](${l.href})`);
    }
    lines.push("");
  }

  lines.push("## Social profiles");
  lines.push("");
  for (const s of data.socials as Array<{ title: string; href: string }>) {
    lines.push(`- [${s.title}](${s.href})`);
  }
  lines.push("");

  lines.push("## Agent discovery");
  lines.push("");
  lines.push(`- API catalog (RFC 9727): ${siteUrl}/.well-known/api-catalog`);
  lines.push(`- A2A agent card: ${siteUrl}/.well-known/agent-card.json`);
  lines.push(`- Agent skills index: ${siteUrl}/.well-known/agent-skills/index.json`);
  lines.push(
    `- Markdown content negotiation: request any page with ` +
      `\`Accept: text/markdown\``
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
