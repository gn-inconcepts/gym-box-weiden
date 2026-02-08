"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gym", label: "Das Gym" },
    { href: "/box", label: "The Box" },
    { href: "/team", label: "Team" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/preise", label: "Preise" },
    { href: "/kontakt", label: "Kontakt" },
];

import { usePathname } from "next/navigation";

// ... imports

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isGym = pathname === "/gym";
    const isBox = pathname === "/box";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [mobileMenuOpen]);

    return (
        <>
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
                            <img src="/images/Bernhard_2022_SW_300ppi.png" alt="Bernhard Trainiert" className="h-8 md:h-10 w-auto invert dark:invert-0" />
                        ) : isBox ? (
                            <img src="/images/CF-LF_2022_SW_300ppi.png" alt="CrossFit Lakefront" className="h-8 md:h-10 w-auto invert dark:invert-0" />
                        ) : (
                            <div className="font-display text-2xl md:text-3xl tracking-wider flex items-center gap-1 text-brand-white">
                                <span>GYM</span>
                                <span className="text-brand-green">&</span>
                                <span>BOX</span>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
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
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-brand-black/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center",
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="absolute top-6 right-6 flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        className="p-2 text-brand-white/50 hover:text-brand-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>

                <nav className="flex flex-col items-center gap-6">
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
