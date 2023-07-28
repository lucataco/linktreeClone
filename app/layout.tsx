import { Analytics } from "../components/Analytics";
import "../styles/globals.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <head></head>
    <body>
      {children}
      <Analytics />
      <script defer data-domain="lucataco.dev" src="https://data.lucata.co/js/script.js"></script>
    </body>
  </html>
);

export default Layout;
