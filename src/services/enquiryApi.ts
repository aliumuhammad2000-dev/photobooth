import type { BookingFormValues } from '../types/booking';
import { enquiryStatuses, type Enquiry, type EnquiryStatus } from '../types/enquiry';

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

async function requestJson<T>(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  validate: (value: unknown) => value is T,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(input, init);
  } catch {
    throw new EnquiryApiError('network', 'Unable to reach the local demo API.');
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

  if (!validate(responseBody)) {
    throw new EnquiryApiError(
      'invalid-response',
      'The local demo API returned an unexpected response.',
    );
  }

  return responseBody;
}

function isEnquiryList(value: unknown): value is Enquiry[] {
  return Array.isArray(value) && value.every(isEnquiry);
}

export async function createEnquiry(
  bookingDetails: BookingFormValues,
): Promise<Enquiry> {
  const payload: EnquiryPayload = {
    ...bookingDetails,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  return requestJson('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }, isEnquiry);
}

export function getEnquiries(): Promise<Enquiry[]> {
  return requestJson('/api/enquiries', undefined, isEnquiryList);
}

export function getEnquiry(id: string): Promise<Enquiry> {
  return requestJson(`/api/enquiries/${encodeURIComponent(id)}`, undefined, isEnquiry);
}

export function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
): Promise<Enquiry> {
  return requestJson(`/api/enquiries/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }, isEnquiry);
}

export async function deleteEnquiry(id: string): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`/api/enquiries/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  } catch {
    throw new EnquiryApiError('network', 'Unable to reach the local demo API.');
  }

  if (!response.ok) {
    throw new EnquiryApiError(
      'http',
      `The local demo API returned an HTTP ${response.status} response.`,
      response.status,
    );
  }
}
