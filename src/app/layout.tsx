import "./globals.css";
import { Toaster } from "sonner";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap", // ensures text shows instantly with fallback
});

// You can change this to your custom favicon icon, title and description
export const metadata = {
  title: "Smarter Roofing Services",
  description: `Houston’s Trusted Roofing Partner for Residential & Commercial Projects`,
  icons: {
    icon: "/Borrelli_Logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <main>{children}</main>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
