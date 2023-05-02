/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "www.lucataco.com",
      "bedtimestory.live",
      "profilepics.ai",
      "readingmoods.vercel.app",
      "huggingface.co",
      "www.catacolabs.com",
      "em-content.zobj.net",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
