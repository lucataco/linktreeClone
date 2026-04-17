/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react', 'react-dom'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    // Link headers for agent discovery per RFC 8288 and RFC 9727 Section 3
    const linkHeader = [
      '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
      '</.well-known/agent-card.json>; rel="https://a2a-protocol.org/rels/agent-card"; type="application/json"',
      '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rels/skills-index"; type="application/json"',
      '</llms.txt>; rel="describedby"; type="text/plain"',
    ].join(', ');

    return [
      {
        // Link headers for agent discovery on every page (RFC 8288 + RFC 9727)
        source: '/:path*',
        headers: [
          { key: 'Link', value: linkHeader },
          { key: 'Vary', value: 'Accept' },
        ],
      },
      {
        // CORS + caching for well-known agent discovery resources.
        // (Content-Type is set by the route handlers themselves.)
        source: '/.well-known/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ];
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "www.lucataco.com",
      "bedtimestory.live",
      "proheadshot.pics",
      "readingmoods.vercel.app",
      "huggingface.co",
      "www.catacolabs.com",
      "em-content.zobj.net",
      "upload.wikimedia.org",
      "lh6.googleusercontent.com",
      "www.gitbook.com",
      "replicate.com",
      "pbs.twimg.com",
      "youngagain.vercel.app"
    ],
  },
};

module.exports = nextConfig;
