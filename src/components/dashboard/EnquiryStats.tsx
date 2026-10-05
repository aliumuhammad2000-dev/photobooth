import type { Enquiry } from '../../types/enquiry';

interface EnquiryStatsProps {
  enquiries: Enquiry[];
}

function EnquiryStats({ enquiries }: EnquiryStatsProps) {
  const stats = [
    { label: 'Total', value: enquiries.length },
    { label: 'New', value: enquiries.filter((enquiry) => enquiry.status === 'new').length },
    { label: 'Contacted', value: enquiries.filter((enquiry) => enquiry.status === 'contacted').length },
    { label: 'Booked', value: enquiries.filter((enquiry) => enquiry.status === 'booked').length },
  ];

  return (
    <section aria-label="Enquiry summary" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <article className="rounded-sm border border-brand/20 bg-surface p-4 sm:p-5" key={stat.label}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">{stat.label}</p>
          <p className="mt-3 font-serif text-4xl text-cream">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}

export default EnquiryStats;
