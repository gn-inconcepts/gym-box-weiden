"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname.startsWith("/studio")) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
