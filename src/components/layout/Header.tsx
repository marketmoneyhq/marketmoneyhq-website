"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { navigation } from "@/lib/constants";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lightNav = isHome && !isScrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProgramsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "glass shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2.5 group">
            <BrandLogo size="sm" priority className="rounded-full" />
            <span
              className={cn(
                "font-display font-bold text-lg tracking-tight hidden sm:block transition-colors",
                lightNav && "text-white"
              )}
            >
              Market Money HQ
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) =>
              "children" in item && item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setProgramsOpen(true)}
                  onMouseLeave={() => setProgramsOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors",
                      lightNav
                        ? "text-white/90 hover:bg-white/10"
                        : "hover:bg-gray-100 dark:hover:bg-charcoal-light",
                      programsOpen && !lightNav && "bg-gray-100 dark:bg-charcoal-light",
                      programsOpen && lightNav && "bg-white/10"
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        programsOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {programsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 glass-card p-2 shadow-xl"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-charcoal-light transition-colors"
                          >
                            <span className="font-medium text-sm">{child.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {child.description}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    lightNav
                      ? "text-white/90 hover:bg-white/10"
                      : "hover:bg-gray-100 dark:hover:bg-charcoal-light",
                    pathname === item.href && !lightNav && "text-[#0088ff]",
                    pathname === item.href && lightNav && "text-[#4db8ff]"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className={lightNav ? "text-white hover:bg-white/10" : undefined} />
            <Button href={siteConfig.calendlyUrl} size="sm" className="hidden sm:inline-flex">
              Book Consultation
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden w-9 h-9 flex items-center justify-center rounded-full",
                lightNav
                  ? "text-white hover:bg-white/10"
                  : "hover:bg-gray-100 dark:hover:bg-charcoal-light"
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-200/50 dark:border-white/10 overflow-hidden"
          >
            <div className="container-custom px-4 py-6 space-y-1">
              {navigation.map((item) =>
                "children" in item && item.children ? (
                  <div key={item.name} className="space-y-1">
                    <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {item.name}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-charcoal-light"
                      >
                        <span className="font-medium">{child.name}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-charcoal-light",
                      pathname === item.href && "text-[#0088ff]"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <div className="pt-4 px-4">
                <Button href={siteConfig.calendlyUrl} className="w-full">
                  Book Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
