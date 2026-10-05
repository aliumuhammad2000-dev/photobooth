import type { BookingFormValues } from './booking';

export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'booked'
  | 'completed'
  | 'cancelled';

export const enquiryStatuses = [
  'new',
  'contacted',
  'booked',
  'completed',
  'cancelled',
] as const satisfies readonly EnquiryStatus[];

export type Enquiry = BookingFormValues & {
  id: string;
  status: EnquiryStatus;
  createdAt: string;
};
