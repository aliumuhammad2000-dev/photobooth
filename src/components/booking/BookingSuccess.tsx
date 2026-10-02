import { useEffect, useRef } from 'react';
import type { Enquiry } from '../../types/enquiry';

interface BookingSuccessProps {
  copyStatus: 'idle' | 'success' | 'error';
  enquiry: Enquiry;
  onCopy: () => void;
  onStartOver: () => void;
}

function BookingSuccess({
  copyStatus,
  enquiry,
  onCopy,
  onStartOver,
}: BookingSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section
      aria-labelledby="booking-success-heading"
      className="rounded-sm border border-brand/40 bg-surface p-6 sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
        DEMO ENQUIRY SAVED
      </p>
      <h2
        className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-cream"
        id="booking-success-heading"
        ref={headingRef}
        tabIndex={-1}
      >
        Demo enquiry saved successfully.
      </h2>
      <p className="mt-6 text-sm leading-relaxed text-soft" role="status">
        Your fictional test enquiry has been saved to the local mock database.
        This is a development demonstration and has not been delivered to the
        photographer or confirmed as a booking.
      </p>
      <p className="mt-4 text-xs leading-relaxed text-soft">
        Demo record ID: <span className="font-mono text-brand">{enquiry.id}</span>
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          onClick={onCopy}
          type="button"
        >
          Copy Saved Demo Details
        </button>
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-brand hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          onClick={onStartOver}
          type="button"
        >
          Start New Demo Enquiry
        </button>
      </div>

      {copyStatus === 'success' && (
        <p aria-live="polite" className="mt-4 text-sm text-brand">
          Saved enquiry details copied to your clipboard.
        </p>
      )}
      {copyStatus === 'error' && (
        <p aria-live="polite" className="mt-4 text-sm text-cream">
          We could not access the clipboard. The saved demo record remains in the local mock database.
        </p>
      )}
    </section>
  );
}

export default BookingSuccess;
