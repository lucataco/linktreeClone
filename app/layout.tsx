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
      <script defer src="https://data.lucataco.dev/script.js" data-website-id="b13bd10a-0079-4345-a654-ad02cc54b3b7"></script>
    </body>
  </html>
);

export default Layout;
