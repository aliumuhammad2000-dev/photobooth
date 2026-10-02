import type { BookingFormValues } from '../types/booking';
import type { Enquiry, EnquiryStatus } from '../types/enquiry';

type EnquiryPayload = BookingFormValues & {
  status: 'new';
  createdAt: string;
};

export type EnquiryApiErrorKind = 'network' | 'http' | 'invalid-response';

export class EnquiryApiError extends Error {
  kind: EnquiryApiErrorKind;
  status?: number;

  constructor(kind: EnquiryApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'EnquiryApiError';
    this.kind = kind;
    this.status = status;
  }
}

const enquiryStatuses: EnquiryStatus[] = [
  'new',
  'contacted',
  'booked',
  'completed',
  'cancelled',
];

function isEnquiry(value: unknown): value is Enquiry {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.fullName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.phone === 'string' &&
    typeof candidate.serviceSlug === 'string' &&
    typeof candidate.preferredDate === 'string' &&
    typeof candidate.preferredTime === 'string' &&
    typeof candidate.location === 'string' &&
    typeof candidate.details === 'string' &&
    typeof candidate.createdAt === 'string' &&
    !Number.isNaN(Date.parse(candidate.createdAt)) &&
    typeof candidate.status === 'string' &&
    enquiryStatuses.includes(candidate.status as EnquiryStatus)
  );
}

export async function createEnquiry(
  bookingDetails: BookingFormValues,
): Promise<Enquiry> {
  const payload: EnquiryPayload = {
    ...bookingDetails,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  let response: Response;

  try {
    response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new EnquiryApiError(
      'network',
      'Unable to reach the local demo API.',
    );
  }

  if (!response.ok) {
    throw new EnquiryApiError(
      'http',
      `The local demo API returned an HTTP ${response.status} response.`,
      response.status,
    );
  }

  let responseBody: unknown;

  try {
    responseBody = await response.json();
  } catch {
    throw new EnquiryApiError(
      'invalid-response',
      'The local demo API returned an unreadable response.',
    );
  }

  if (!isEnquiry(responseBody)) {
    throw new EnquiryApiError(
      'invalid-response',
      'The local demo API returned an unexpected saved-enquiry response.',
    );
  }

  return responseBody;
}
