import Topbar from "@/components/shared/Navbar/top-bar";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";
import "../globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </main>
  );
}
