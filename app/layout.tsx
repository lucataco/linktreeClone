import "../styles/globals.css";
import type { Metadata } from "next";
import data from "../data.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${data.name} | Machine Learning Engineer & AI Developer`,
  description: `${data.name} - ${data.desc}. Links to Replicate models, GitHub projects, and AI/ML resources.`,
  icons: { icon: "/favicon.ico" },
  authors: [{ name: data.name, url: siteUrl }],
  creator: data.name,
  publisher: data.name,
  keywords: ["machine learning", "AI", "Replicate", "ML models", "lucataco", "Catacolabs"],
  openGraph: {
    title: `${data.name} | Machine Learning Engineer & AI Developer`,
    description: `${data.name} - ${data.desc}. Links to Replicate models, GitHub projects, and AI/ML resources.`,
    url: "/",
    siteName: data.name,
    images: [
      { url: "/lucataco-avatar.jpg", width: 1200, height: 630, alt: data.name },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${data.name} | Machine Learning Engineer & AI Developer`,
    description: `${data.name} - ${data.desc}. Links to Replicate models, GitHub projects, and AI/ML resources.`,
    images: ["/lucataco-avatar.jpg"],
    creator: "@lucatac0",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: data.name,
      description: data.desc,
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: `${data.name} | Links`,
      description: `${data.name} - ${data.desc}`,
      mainEntity: { "@id": `${siteUrl}/#person` },
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: data.name,
      description: data.desc,
      url: siteUrl,
      image: `${siteUrl}/lucataco-avatar.jpg`,
      jobTitle: "Machine Learning Engineer",
      knowsAbout: ["Machine Learning", "Artificial Intelligence", "Replicate", "ML Models"],
      sameAs: data.socials.map((s: { href: string }) => s.href),
    },
  ],
};

type LayoutProps = { children: any };

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data for AI/generative search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preload critical images */}
        <link rel="preload" as="image" href={data.avatar} />
        <link rel="preload" as="image" href={data.links[0]?.image} />
        <link rel="preload" as="image" href={data.links[1]?.image} />
        <link rel="preload" as="image" href={data.links[2]?.image} />
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//data.lucataco.dev" />
        <link rel="preconnect" href="https://replicate.com" />
        <link rel="preconnect" href="https://github.com" />
      </head>
      <body>
        {children}
        <script defer src="https://data.lucataco.dev/script.js" data-website-id="b13bd10a-0079-4345-a654-ad02cc54b3b7"></script>
      </body>
    </html>
  );
};

export default Layout;
