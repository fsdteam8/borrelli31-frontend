import "./globals.css";
import { Toaster } from "sonner";

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
    <html>
      <body>
        <main>{children}</main>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
