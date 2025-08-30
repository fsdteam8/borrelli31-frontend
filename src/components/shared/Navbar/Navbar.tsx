"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

// Navigation items with dropdown support
const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Commercial Roofing Services", href: "/commercial-services" },
  { title: "Residential Roofing Services", href: "/residential-services" },
  { title: "About Borrelli Roofing", href: "/about-borrelli-roofing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ",
        isScrolled ? "bg-white/60 backdrop-blur-xl shadow-sm" : "bg-[#FAFAFA]"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 py-2">
        <div className="flex  items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 w-[96px] h-[84px]"
          >
            <Image
              src="/Borrelli_Logo.svg"
              alt="Borrelli Logo"
              width={150}
              height={50}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <React.Fragment key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary underline" : "text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="tel:+1234567890">
              <Button
                variant="secondary"
                className="flex items-center space-x-2 bg-[#0F3D68] text-white hover:bg-[#0F3D68]/90 focus:ring-4 focus:ring-[#0F3D68]/50 py-4 md:px-5 lg:px-6 cursor-pointer h-12 w-[134px]"
              >
                <Phone className="h-4 w-4" />
                <span className="text-base font-bold">Call Now</span>
              </Button>
            </Link>
          </div>
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col px-4 space-y-6 pt-6">
                {navigationItems.map((item) => (
                  <React.Fragment key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </React.Fragment>
                ))}
                <Link href="tel:+1234567890">
                  <Button
                    variant="secondary"
                    className="flex items-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Us</span>
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
