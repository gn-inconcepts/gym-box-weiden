"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gym", label: "Das Gym" },
    { href: "/box", label: "The Box" },
    { href: "/team", label: "Team" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/preise", label: "Preise" },
    { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const sentinelRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const isGym = pathname === "/gym";
    const isBox = pathname === "/box";

    // IntersectionObserver for scroll detection instead of scroll event listener
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setScrolled(!entry.isIntersecting);
            },
            { threshold: 1.0 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    // Lock body scroll when mobile menu is open, with cleanup
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Focus trap for mobile menu
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!mobileMenuOpen) return;

            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                return;
            }

            if (e.key !== "Tab") return;

            const menu = mobileMenuRef.current;
            if (!menu) return;

            const focusableElements = menu.querySelectorAll<HTMLElement>(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            const firstEl = focusableElements[0];
            const lastEl = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        },
        [mobileMenuOpen]
    );

    return (
        <>
            {/* Sentinel element for IntersectionObserver — sits at the very top of the page */}
            <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-[50px] pointer-events-none" aria-hidden="true" />

            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
                    scrolled
                        ? "bg-brand-black/90 backdrop-blur-md border-b border-brand-white/5 py-4"
                        : "bg-transparent py-6"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        {isGym ? (
                            <Image
                                src="/images/Bernhard_2022_SW_300ppi.png"
                                alt="Bernhard Trainiert"
                                width={160}
                                height={40}
                                className="h-8 md:h-10 w-auto invert dark:invert-0"
                                priority
                            />
                        ) : isBox ? (
                            <Image
                                src="/images/CF-LF_2022_SW_300ppi.png"
                                alt="CrossFit Lakefront"
                                width={160}
                                height={40}
                                className="h-8 md:h-10 w-auto invert dark:invert-0"
                                priority
                            />
                        ) : (
                            <div className="font-display text-2xl md:text-3xl tracking-wider flex items-center gap-1 text-brand-white">
                                <span>GYM</span>
                                <span className="text-brand-green">&</span>
                                <span>BOX</span>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Hauptnavigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                                    scrolled
                                        ? "text-brand-gray-light hover:text-brand-white"
                                        : "text-white/90 hover:text-white"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="ml-2 flex items-center gap-4">
                            <ThemeToggle />
                            <Link
                                href="/kontakt"
                                className="px-4 py-2 bg-brand-green text-brand-black font-semibold rounded-md text-sm hover:bg-brand-green/90 transition-colors"
                            >
                                Erstberatung
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className={cn(
                            "md:hidden p-2 transition-colors",
                            scrolled ? "text-brand-white" : "text-white"
                        )}
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Menü öffnen"
                        aria-expanded={mobileMenuOpen}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className={cn(
                    "fixed inset-0 z-[60] bg-brand-black/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center",
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
                onKeyDown={handleKeyDown}
            >
                <div className="absolute top-6 right-6 flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        className="p-2 text-brand-white/50 hover:text-brand-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Menü schließen"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>

                <nav className="flex flex-col items-center gap-6" aria-label="Hauptnavigation">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-display text-4xl tracking-widest text-brand-gray-light hover:text-brand-green transition-colors transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/kontakt"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-4 px-8 py-3 bg-brand-green text-brand-black font-semibold rounded-lg text-lg hover:bg-brand-green/90 transition-colors"
                    >
                        Kostenlose Erstberatung
                    </Link>
                </nav>
            </div>
        </>
    );
}
