import type { RefObject } from 'react';

interface DashboardHeaderProps {
  headingRef?: RefObject<HTMLHeadingElement | null>;
}

function DashboardHeader({ headingRef }: DashboardHeaderProps) {
  return (
    <header className="border-b border-brand/20 pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
        DEVELOPMENT DASHBOARD
      </p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-6xl" ref={headingRef} tabIndex={-1}>
        Enquiries, kept in view.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">
        Review fictional local enquiries, follow up on their status, and learn how a frontend talks to a REST API.
      </p>
      <p className="mt-5 inline-flex rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm text-brand">
        Development dashboard — fictional local enquiry data only.
      </p>
    </header>
  );
}

export default DashboardHeader;
