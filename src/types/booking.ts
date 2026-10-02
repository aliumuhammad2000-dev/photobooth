export type BookingFormValues = {
  fullName: string;
  email: string;
  phone: string;
  serviceSlug: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  details: string;
};

export type BookingFieldName = keyof BookingFormValues;

export type BookingErrors = Partial<Record<BookingFieldName, string>>;

export type BookingProcessStage = {
  number: string;
  title: string;
  description: string;
};

export type BookingPageContent = {
  eyebrow: string;
  heading: string;
  description: string;
  processHeading: string;
  processStages: BookingProcessStage[];
  pricingNote: string;
  privacyNote: string;
};
