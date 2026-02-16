'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bebas mb-4">Etwas ist schiefgelaufen</h1>
        <p className="text-brand-gray mb-8">Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.</p>
        <button onClick={reset} className="bg-brand-green text-black px-6 py-3 font-semibold hover:bg-brand-green/90 transition-colors">
          Erneut versuchen
        </button>
      </div>
    </div>
  )
}
