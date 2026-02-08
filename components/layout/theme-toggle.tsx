"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        // Check initial preference
        if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            setTheme('light');
            document.documentElement.classList.add('light');
        } else {
            setTheme('dark');
            document.documentElement.classList.remove('light');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            document.documentElement.classList.add("light");
            localStorage.theme = "light";
        } else {
            setTheme("dark");
            document.documentElement.classList.remove("light");
            localStorage.theme = "dark";
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-8 rounded-full bg-brand-dark border border-white/10 flex items-center p-1 transition-colors hover:border-brand-green/50"
            aria-label="Toggle Theme"
        >
            <div
                className={`w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-brand-black transition-transform duration-300 ${theme === 'light' ? 'translate-x-[22px]' : 'translate-x-0'}`}
            >
                {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            </div>
        </button>
    );
}
