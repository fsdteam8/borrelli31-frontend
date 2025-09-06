import "./globals.css";
import { Toaster } from "sonner";
import { Manrope } from "next/font/google";
import Providers from "@/Providers/provider";
import MainProviders from "@/Providers/MainProviders";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",  
});

// You can change this to your custom favicon icon, title and description
export const metadata = {
  title: "Smarter Roofing Services",
  description: `Houston Roofing Solutions – Quality Residential & Commercial Roof Services`,
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
        <MainProviders>
          <Providers> {children} </Providers>
        </MainProviders>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
