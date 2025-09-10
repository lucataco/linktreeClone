/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
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
