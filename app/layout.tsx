import "../styles/globals.css";
import type { Metadata } from "next";

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

const Layout = ({ children }: LayoutProps) => (
  <html lang="en">
    <body>
      {children}
      <script defer src="https://data.lucataco.dev/script.js" data-website-id="b13bd10a-0079-4345-a654-ad02cc54b3b7"></script>
    </body>
  </html>
);

export default Layout;
