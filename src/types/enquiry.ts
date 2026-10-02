import type { BookingFormValues } from './booking';

export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'booked'
  | 'completed'
  | 'cancelled';

export type Enquiry = BookingFormValues & {
  id: string;
  status: EnquiryStatus;
  createdAt: string;
};
