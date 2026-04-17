"use client";

import { useEffect } from "react";
import data from "../data.json";

/**
 * WebMCP client component.
 *
 * Registers this site's tools with the browser's WebMCP API so that AI
 * agents running in the browser can list links, fetch the profile, and
 * search for specific entries without scraping the DOM.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 */
export default function WebMcp() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mc: any = (navigator as any).modelContext;
    if (!mc) return;

    const controller = new AbortController();
    const { signal } = controller;

    type Link = {
      title: string;
      href: string;
      discontinued?: boolean;
      acquired?: boolean;
    };
    const links = data.links as Link[];

    const statusOf = (l: Link) =>
      l.acquired ? "acquired" : l.discontinued ? "discontinued" : "active";

    const toolList = [
      {
        name: "list_links",
        description:
          "Return every link published on this page (projects, referrals, and social profiles) with title, href, and status.",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["all", "active", "discontinued", "acquired"],
              description: "Filter by status. Defaults to 'all'.",
            },
          },
        },
        execute: async ({ status = "all" }: { status?: string } = {}) => {
          const items = links
            .filter((l) => status === "all" || statusOf(l) === status)
            .map((l) => ({
              title: l.title,
              href: l.href,
              status: statusOf(l),
            }));
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(items, null, 2),
              },
            ],
          };
        },
      },
      {
        name: "get_profile",
        description:
          "Return profile info for the site owner: name, description, avatar URL, and social profiles.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: async () => {
          const profile = {
            name: data.name,
            description: data.desc,
            avatar: data.avatar,
            socials: data.socials,
          };
          return {
            content: [
              { type: "text", text: JSON.stringify(profile, null, 2) },
            ],
          };
        },
      },
      {
        name: "find_link",
        description:
          "Case-insensitive search of link titles. Returns matching entries with their URLs.",
        inputSchema: {
          type: "object",
          required: ["query"],
          properties: {
            query: {
              type: "string",
              description: "Substring to search for in link titles.",
              minLength: 1,
            },
          },
        },
        execute: async ({ query }: { query: string }) => {
          const q = (query || "").toLowerCase();
          const matches = links
            .filter((l) => l.title.toLowerCase().includes(q))
            .map((l) => ({
              title: l.title,
              href: l.href,
              status: statusOf(l),
            }));
          return {
            content: [
              { type: "text", text: JSON.stringify(matches, null, 2) },
            ],
          };
        },
      },
    ];

    // The spec is still in flux; support both registerTool (current) and
    // provideContext (earlier drafts) so we register on as many browsers
    // as possible.
    try {
      if (typeof mc.registerTool === "function") {
        for (const tool of toolList) {
          try {
            mc.registerTool({ ...tool, signal });
          } catch (err) {
            // Non-fatal: a single tool failing shouldn't break the page.
            console.warn("WebMCP registerTool failed", tool.name, err);
          }
        }
      } else if (typeof mc.provideContext === "function") {
        mc.provideContext({ tools: toolList });
      }
    } catch (err) {
      console.warn("WebMCP registration error", err);
    }

    return () => controller.abort();
  }, []);

  return null;
}
