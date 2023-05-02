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
    </body>
  </html>
);

export default Layout;
