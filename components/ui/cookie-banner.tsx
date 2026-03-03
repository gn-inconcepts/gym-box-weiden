'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            setShowBanner(true)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        setShowBanner(false)
    }

    const declineCookies = () => {
        localStorage.setItem('cookie-consent', 'declined')
        setShowBanner(false)
    }

    if (!showBanner || pathname.startsWith('/studio')) return null

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-brand-black/95 backdrop-blur-sm border-t border-white/10"
            role="dialog"
            aria-label="Cookie-Einstellungen"
        >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-brand-gray">
                    Diese Website verwendet nur technisch notwendige Cookies. Mehr Informationen in unserer{' '}
                    <Link href="/datenschutz" className="text-brand-green underline hover:no-underline">
                        Datenschutzerklärung
                    </Link>.
                </p>
                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={declineCookies}
                        className="px-4 py-2 text-sm border border-white/20 text-white hover:bg-white/10 transition-colors"
                    >
                        Ablehnen
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="px-4 py-2 text-sm bg-brand-green text-black font-semibold hover:bg-brand-green/90 transition-colors"
                    >
                        Akzeptieren
                    </button>
                </div>
            </div>
        </div>
    )
}
