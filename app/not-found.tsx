import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">404 · route not found</p>
        <h1 className="mt-4 text-7xl font-semibold tracking-tighter sm:text-9xl">Lost in the graph.</h1>
        <p className="mt-6 text-fog">The agent searched every node. This page isn&apos;t one of them.</p>
        <Link href="/" className="mt-10 inline-block rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink hover:bg-mint">
          Back home
        </Link>
      </div>
    </main>
  );
}
