import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lucataco — Links",
  description: "Curated links to projects, socials, and more.",
  icons: { icon: "/favicon.ico" },
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
