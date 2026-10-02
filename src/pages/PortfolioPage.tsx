import { useState } from 'react';
import PortfolioFilters from '../components/portfolio/PortfolioFilters';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import { selectedWorks } from '../data/selectedWorks';
import { portfolioPageContent } from '../data/portfolioPage';

const allCategory = 'All';

function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState(allCategory);
  const categories = [
    allCategory,
    ...Array.from(new Set(selectedWorks.map((work) => work.category))),
  ];
  const filteredWorks =
    activeCategory === allCategory
      ? selectedWorks
      : selectedWorks.filter((work) => work.category === activeCategory);
  const hasPlaceholders = selectedWorks.some((work) => work.kind === 'placeholder');

  return (
    <main className="flex-1 bg-canvas px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
            {portfolioPageContent.eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl">
            {portfolioPageContent.heading}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
            {portfolioPageContent.description}
          </p>
          {hasPlaceholders && (
            <p className="mt-5 max-w-xl text-xs leading-relaxed text-brand sm:text-sm">
              Some entries remain demonstration compositions until their photography is connected.
            </p>
          )}
        </header>

        <div className="mt-12 border-y border-brand/20 py-5 sm:mt-16 sm:py-6">
          <PortfolioFilters
            activeCategory={activeCategory}
            categories={categories}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="mt-10 sm:mt-12">
          <PortfolioGrid works={filteredWorks} />
        </div>
      </div>
    </main>
  );
}

export default PortfolioPage;
