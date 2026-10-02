import type { PhotographyService } from '../../types/services';
import type { BookingFormValues } from '../../types/booking';

interface BookingSummaryProps {
  copyStatus: 'idle' | 'success' | 'error';
  onCopy: () => void;
  onEdit: () => void;
  service: PhotographyService;
  values: BookingFormValues;
}

function BookingSummary({
  copyStatus,
  onCopy,
  onEdit,
  service,
  values,
}: BookingSummaryProps) {
  return (
    <section aria-labelledby="review-enquiry-heading" className="rounded-sm border border-brand/25 bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            REVIEW ENQUIRY
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-cream" id="review-enquiry-heading">
            Check the details before you share them.
          </h2>
        </div>
        <button
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-brand/60 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-brand hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          onClick={onEdit}
          type="button"
        >
          Edit Details
        </button>
      </div>

      <dl className="mt-8 divide-y divide-brand/15 border-y border-brand/15">
        <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Full name</dt>
          <dd className="text-sm text-cream">{values.fullName}</dd>
        </div>
        <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Email</dt>
          <dd className="break-words text-sm text-cream">{values.email}</dd>
        </div>
        {values.phone && (
          <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Phone</dt>
            <dd className="text-sm text-cream">{values.phone}</dd>
          </div>
        )}
        <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Service</dt>
          <dd className="text-sm text-cream">{service.name}</dd>
        </div>
        <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Preferred date</dt>
          <dd className="text-sm text-cream">{values.preferredDate}</dd>
        </div>
        {values.preferredTime && (
          <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Preferred time</dt>
            <dd className="text-sm text-cream">{values.preferredTime}</dd>
          </div>
        )}
        {values.location && (
          <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Location</dt>
            <dd className="text-sm text-cream">{values.location}</dd>
          </div>
        )}
        <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Details</dt>
          <dd className="whitespace-pre-wrap text-sm leading-relaxed text-cream">{values.details}</dd>
        </div>
      </dl>

      <p className="mt-6 text-sm leading-relaxed text-soft">
        Your enquiry has not been sent. Copy the details to share them with the photographer. Online submission will be available when the enquiry system is connected.
      </p>
      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:w-auto"
        onClick={onCopy}
        type="button"
      >
        Copy Enquiry Details
      </button>
      {copyStatus === 'success' && (
        <p aria-live="polite" className="mt-4 text-sm text-brand">
          Enquiry details copied to your clipboard.
        </p>
      )}
      {copyStatus === 'error' && (
        <p aria-live="polite" className="mt-4 text-sm text-cream">
          We could not access the clipboard. You can still use Edit Details to review or copy the text manually.
        </p>
      )}
    </section>
  );
}

export default BookingSummary;
