import Topbar from "@/components/shared/Navbar/top-bar";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";
import "../globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap", // ensures text shows instantly with fallback
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${manrope.variable} manrope`}>
      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </main>
  );
}
