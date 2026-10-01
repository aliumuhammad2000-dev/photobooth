interface PortfolioFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function PortfolioFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: PortfolioFiltersProps) {
  return (
    <div aria-label="Filter portfolio by category" className="flex flex-wrap gap-2" role="group">
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:px-5 sm:py-2.5 ${
              isActive
                ? 'border-brand bg-brand text-canvas'
                : 'border-brand/40 text-soft hover:border-brand hover:bg-brand/15 hover:text-cream'
            }`}
            key={category}
            onClick={() => onCategoryChange(category)}
            type="button"
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default PortfolioFilters;
