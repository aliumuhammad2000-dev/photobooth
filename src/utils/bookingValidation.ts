import { photographyServices } from '../data/services';
import type { BookingErrors, BookingFormValues } from '../types/booking';

export const bookingFieldLimits = {
  fullName: 100,
  email: 254,
  phone: 40,
  location: 160,
  details: 2000,
} as const;

export function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function normalizeBookingValues(values: BookingFormValues): BookingFormValues {
  return {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    serviceSlug: values.serviceSlug,
    preferredDate: values.preferredDate,
    preferredTime: values.preferredTime,
    location: values.location.trim(),
    details: values.details.trim(),
  };
}

export function validateBooking(values: BookingFormValues): BookingErrors {
  const errors: BookingErrors = {};
  const serviceExists = photographyServices.some(
    (service) => service.slug === values.serviceSlug,
  );

  if (!values.fullName) {
    errors.fullName = 'Please enter your full name.';
  } else if (values.fullName.length > bookingFieldLimits.fullName) {
    errors.fullName = `Please keep your name under ${bookingFieldLimits.fullName} characters.`;
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (values.email.length > bookingFieldLimits.email) {
    errors.email = `Please keep your email under ${bookingFieldLimits.email} characters.`;
  }

  if (values.phone.length > bookingFieldLimits.phone) {
    errors.phone = `Please keep your phone number under ${bookingFieldLimits.phone} characters.`;
  }

  if (!serviceExists) {
    errors.serviceSlug = 'Please choose a photography service.';
  }

  if (!values.preferredDate) {
    errors.preferredDate = 'Please choose a preferred session date.';
  } else if (values.preferredDate < getLocalDateInputValue()) {
    errors.preferredDate = 'Please choose today or a future date.';
  }

  if (values.location.length > bookingFieldLimits.location) {
    errors.location = `Please keep the location under ${bookingFieldLimits.location} characters.`;
  }

  if (!values.details) {
    errors.details = 'Please tell us a little about your photography needs.';
  } else if (values.details.length > bookingFieldLimits.details) {
    errors.details = `Please keep your details under ${bookingFieldLimits.details} characters.`;
  }

  return errors;
}

export function formatEnquiryDetails(values: BookingFormValues, serviceName: string) {
  const optionalLines = [
    values.phone && `Phone: ${values.phone}`,
    values.preferredTime && `Preferred time: ${values.preferredTime}`,
    values.location && `Location: ${values.location}`,
  ].filter(Boolean);

  return [
    'Photography enquiry',
    '',
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Service: ${serviceName}`,
    `Preferred date: ${values.preferredDate}`,
    ...optionalLines,
    '',
    'Additional details:',
    values.details,
    '',
    'This enquiry has not been sent or confirmed.',
  ].join('\n');
}
