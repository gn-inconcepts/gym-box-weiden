"use client";

export function SkipToContent() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-green focus:text-brand-black focus:font-bold focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-brand-black focus:shadow-lg"
        >
            Zum Hauptinhalt springen
        </a>
    );
}
