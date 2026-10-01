import { foundationContent } from './data/site';

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-5 py-12 sm:px-8 lg:px-12">
      <section className="w-full max-w-2xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:tracking-[0.3em]">
          {foundationContent.eyebrow}
        </p>

        <h1 className="text-5xl font-semibold tracking-tight text-cream sm:text-7xl">
          {foundationContent.brand}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-soft sm:text-lg">
          {foundationContent.description}
        </p>

        <p className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-brand sm:tracking-[0.22em]">
          {foundationContent.label}
        </p>
      </section>
    </main>
  );
}

export default App;
