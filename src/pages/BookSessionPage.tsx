import { useSearchParams } from 'react-router';
import BookingForm from '../components/booking/BookingForm';
import { bookingPageContent } from '../data/booking';
import { photographyServices } from '../data/services';

function BookSessionPage() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service');
  const initialServiceSlug = photographyServices.some(
    (service) => service.slug === requestedService,
  )
    ? requestedService ?? undefined
    : undefined;

  return (
    <main className="flex-1 bg-canvas px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-24">
        <div>
          <header className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
              {bookingPageContent.eyebrow}
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl">
              {bookingPageContent.heading}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-soft sm:text-lg">
              {bookingPageContent.description}
            </p>
          </header>

          <section aria-labelledby="process-heading" className="mt-16 border-t border-brand/20 pt-10 sm:mt-20 sm:pt-12">
            <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-cream" id="process-heading">
              {bookingPageContent.processHeading}
            </h2>
            <div className="mt-8 divide-y divide-brand/15 border-y border-brand/15">
              {bookingPageContent.processStages.map((stage) => (
                <article className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5" key={stage.number}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-brand">{stage.number}</p>
                  <div>
                    <h3 className="text-lg font-semibold text-cream">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-soft">{stage.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-brand">{bookingPageContent.pricingNote}</p>
          </section>
        </div>

        <div className="rounded-sm border border-brand/20 bg-surface/45 p-5 sm:p-8 lg:p-10">
          <BookingForm initialServiceSlug={initialServiceSlug} />
          <p className="mt-8 border-t border-brand/15 pt-5 text-xs leading-relaxed text-soft">
            {import.meta.env.DEV
              ? "Development mode: this form can submit fictional test enquiries to the local mock API. Before submission, details stay in React state; after a successful demo submission, the record is stored in local mock/db.json. Do not enter real personal information."
              : bookingPageContent.privacyNote}
          </p>
        </div>
      </div>
    </main>
  );
}

export default BookSessionPage;
