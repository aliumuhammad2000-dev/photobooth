import type { Enquiry } from '../../types/enquiry';
import { formatCalendarDate, formatTimestamp, getServiceName, getStatusLabel } from '../../utils/enquiryFormatting';

interface EnquiryCardProps {
  enquiry: Enquiry;
  isSelected: boolean;
  isSelectionDisabled: boolean;
  onSelect: () => void;
}

function EnquiryCard({ enquiry, isSelected, isSelectionDisabled, onSelect }: EnquiryCardProps) {
  return (
    <article className={`rounded-sm border bg-surface p-5 transition-colors ${isSelected ? 'border-brand' : 'border-brand/20'}`}>
      <button
        aria-expanded={isSelected}
        className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-70"
        disabled={isSelectionDisabled}
        onClick={onSelect}
        type="button"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-cream">{enquiry.fullName}</p>
            <p className="mt-1 truncate text-sm text-soft">{getServiceName(enquiry.serviceSlug)}</p>
          </div>
          <span className="shrink-0 rounded-full border border-brand/35 px-3 py-1 text-xs font-semibold text-brand">
            {getStatusLabel(enquiry.status)}
          </span>
        </div>
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-soft">Preferred date</dt>
            <dd className="mt-1 text-cream">{formatCalendarDate(enquiry.preferredDate)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-soft">Created</dt>
            <dd className="mt-1 text-cream">{formatTimestamp(enquiry.createdAt)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.16em] text-soft">Email</dt>
            <dd className="mt-1 break-words text-cream">{enquiry.email}</dd>
          </div>
        </dl>
        <span className="mt-5 inline-block text-sm font-semibold text-brand">
          {isSelected ? 'Selected enquiry' : 'View full details'}
        </span>
      </button>
    </article>
  );
}

export default EnquiryCard;
