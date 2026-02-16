import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-black">
      <div className="text-center max-w-lg">
        <p className="text-brand-green font-display text-9xl mb-4">404</p>
        <h1 className="font-display text-4xl md:text-5xl mb-4 text-brand-white">
          Seite nicht gefunden
        </h1>
        <p className="text-brand-gray mb-10 text-lg leading-relaxed">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-brand-green text-brand-black font-semibold text-lg hover:bg-brand-green/90 transition-colors rounded-lg"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
