import "../styles/globals.css";
import type { Metadata } from "next";
import data from "../data.json";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Lucataco | Links",
  description: "Curated links to projects, socials, and more.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Lucataco | Links",
    description: "Curated links to projects, socials, and more.",
    url: "/",
    siteName: "Lucataco",
    images: [
      { url: "/lucataco-avatar.jpg", width: 1200, height: 630, alt: "Lucataco" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucataco | Links",
    description: "Curated links to projects, socials, and more.",
    images: ["/lucataco-avatar.jpg"],
  },
};

type LayoutProps = { children: any };

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
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
