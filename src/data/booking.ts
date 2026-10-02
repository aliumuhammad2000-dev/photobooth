import type { BookingFormValues, BookingPageContent } from '../types/booking';

export const bookingPageContent: BookingPageContent = {
  eyebrow: "LET'S CREATE",
  heading: 'Every great story starts with a conversation.',
  description:
    'Tell us a little about the moments you want to capture. Share your ideas, preferred date, and photography needs, and take the first step toward planning your session.',
  processHeading: 'How the process works.',
  processStages: [
    {
      number: '01',
      title: 'Share your vision',
      description: 'Tell us about the photography session you are planning.',
    },
    {
      number: '02',
      title: 'Discuss the details',
      description:
        'A demo enquiry can be saved locally for development practice; real availability and quotations are discussed separately.',
    },
    {
      number: '03',
      title: 'Plan the session',
      description:
        'Session arrangements are agreed upon before any booking is considered confirmed.',
    },
  ],
  pricingNote:
    'Packages and custom quotations are discussed based on your photography requirements.',
  privacyNote:
    "This production build does not submit enquiries. If you select Copy Enquiry Details, the information is copied to your device's clipboard and may remain there until replaced or cleared.",
};

export const emptyBookingValues: BookingFormValues = {
  fullName: '',
  email: '',
  phone: '',
  serviceSlug: '',
  preferredDate: '',
  preferredTime: '',
  location: '',
  details: '',
};
