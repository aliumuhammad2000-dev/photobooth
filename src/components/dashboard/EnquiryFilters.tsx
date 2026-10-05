import type { EnquiryStatus } from '../../types/enquiry';
import { getStatusLabel } from '../../utils/enquiryFormatting';

export type EnquiryFilter = 'all' | EnquiryStatus;

interface EnquiryFiltersProps {
  query: string;
  filter: EnquiryFilter;
  onQueryChange: (query: string) => void;
  onFilterChange: (filter: EnquiryFilter) => void;
}

const filters: EnquiryFilter[] = ['all', 'new', 'contacted', 'booked', 'completed', 'cancelled'];

function EnquiryFilters({ filter, onFilterChange, onQueryChange, query }: EnquiryFiltersProps) {
  return (
    <section aria-label="Filter enquiries" className="rounded-sm border border-brand/20 bg-surface p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand" htmlFor="enquiry-search">
            Search enquiries
          </label>
          <input
            className="mt-3 w-full rounded-sm border border-brand/25 bg-canvas px-4 py-3 text-base text-cream outline-none transition-colors placeholder:text-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/30"
            id="enquiry-search"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Name, email, or service"
            type="search"
            value={query}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Status</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {filters.map((option) => (
              <button
                aria-pressed={filter === option}
                className={`rounded-full border px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  filter === option
                    ? 'border-brand bg-brand text-canvas'
                    : 'border-brand/35 text-soft hover:border-brand hover:text-cream'
                }`}
                key={option}
                onClick={() => onFilterChange(option)}
                type="button"
              >
                {option === 'all' ? 'All' : getStatusLabel(option)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EnquiryFilters;
