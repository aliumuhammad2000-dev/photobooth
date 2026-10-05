import { photographyServices } from '../data/services';
import type { EnquiryStatus } from '../types/enquiry';

const statusLabels: Record<EnquiryStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  booked: 'Booked',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function getServiceName(serviceSlug: string) {
  return photographyServices.find((service) => service.slug === serviceSlug)?.name ?? 'Unknown service';
}

export function getStatusLabel(status: EnquiryStatus) {
  return statusLabels[status];
}

export function formatCalendarDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) {
    return 'Unknown date';
  }

  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatTimestamp(value: string) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return 'Unknown time';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}
