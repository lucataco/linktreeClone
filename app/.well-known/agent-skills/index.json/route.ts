import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

/**
 * Agent Skills Discovery Index v0.2.0.
 * https://github.com/cloudflare/agent-skills-discovery-rfc
 *
 * Serves SHA-256 digests of each SKILL.md file in public/.well-known/agent-skills/
 * so agents can verify the artifact they fetch.
 */

type Skill = {
  name: string;
  type: "skill-md";
  description: string;
  file: string; // path under public/
};

const SKILLS: Skill[] = [
  {
    name: "list-links",
    type: "skill-md",
    description:
      "Return the full catalog of projects, referrals, and social profiles as a structured list.",
    file: ".well-known/agent-skills/list-links/SKILL.md",
  },
  {
    name: "get-profile",
    type: "skill-md",
    description:
      "Retrieve profile information (name, description, avatar, social accounts).",
    file: ".well-known/agent-skills/get-profile/SKILL.md",
  },
  {
    name: "find-link",
    type: "skill-md",
    description:
      "Locate a specific link from the catalog by title or keyword.",
    file: ".well-known/agent-skills/find-link/SKILL.md",
  },
];

function sha256Of(absPath: string): string {
  const buf = readFileSync(absPath);
  const hex = createHash("sha256").update(buf).digest("hex");
  return `sha256:${hex}`;
}

export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://lucataco.dev";

  const publicDir = join(process.cwd(), "public");

  const skills = SKILLS.map((s) => {
    const abs = join(publicDir, s.file);
    const digest = sha256Of(abs);
    return {
      name: s.name,
      type: s.type,
      description: s.description,
      url: `${siteUrl}/${s.file}`,
      digest,
    };
  });

  const index = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills,
  };

  return new Response(JSON.stringify(index, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
