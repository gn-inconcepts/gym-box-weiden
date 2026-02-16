export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-brand-white/20 border-t-brand-green rounded-full animate-spin" />
        <p className="text-brand-gray text-sm font-medium">Wird geladen...</p>
      </div>
    </div>
  );
}
