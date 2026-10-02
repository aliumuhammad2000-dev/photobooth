import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import BookingField from './BookingField';
import BookingSummary from './BookingSummary';
import { emptyBookingValues } from '../../data/booking';
import { photographyServices } from '../../data/services';
import type { BookingErrors, BookingFieldName, BookingFormValues } from '../../types/booking';
import { bookingFieldLimits, formatEnquiryDetails, getLocalDateInputValue, normalizeBookingValues, validateBooking } from '../../utils/bookingValidation';

interface BookingFormProps {
  initialServiceSlug?: string;
}

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const controlClasses = (error?: string) =>
  `w-full rounded-sm border bg-canvas px-4 py-3 text-base text-cream outline-none transition-colors placeholder:text-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/30 ${
    error ? 'border-cream' : 'border-brand/25'
  }`;

function BookingForm({ initialServiceSlug = '' }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>(() => ({
    ...emptyBookingValues,
    serviceSlug: initialServiceSlug,
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fieldRefs = useRef<Partial<Record<BookingFieldName, FieldElement | null>>>({});

  const setFieldValue = (field: BookingFieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const reviewEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedValues = normalizeBookingValues(values);
    const nextErrors = validateBooking(normalizedValues);

    setValues(normalizedValues);
    setErrors(nextErrors);
    setCopyStatus('idle');

    const firstInvalidField = Object.keys(nextErrors)[0] as BookingFieldName | undefined;
    if (firstInvalidField) {
      window.requestAnimationFrame(() => fieldRefs.current[firstInvalidField]?.focus());
      return;
    }

    setStep('review');
  };

  const selectedService = photographyServices.find(
    (service) => service.slug === values.serviceSlug,
  );

  const copyEnquiry = async () => {
    if (!selectedService) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formatEnquiryDetails(values, selectedService.name));
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
  };

  if (step === 'review' && selectedService) {
    return (
      <BookingSummary
        copyStatus={copyStatus}
        onCopy={copyEnquiry}
        onEdit={() => setStep('form')}
        service={selectedService}
        values={values}
      />
    );
  }

  return (
    <form className="space-y-7" noValidate onSubmit={reviewEnquiry}>
      <div className="grid gap-7 sm:grid-cols-2">
        <BookingField error={errors.fullName} htmlFor="full-name" label="Full name" required>
          <input
            autoComplete="name"
            className={controlClasses(errors.fullName)}
            id="full-name"
            maxLength={bookingFieldLimits.fullName}
            name="fullName"
            onChange={(event) => setFieldValue('fullName', event.target.value)}
            ref={(element) => { fieldRefs.current.fullName = element; }}
            required
            type="text"
            value={values.fullName}
            aria-describedby={errors.fullName ? 'full-name-error' : undefined}
            aria-invalid={Boolean(errors.fullName)}
          />
        </BookingField>

        <BookingField error={errors.email} htmlFor="email" label="Email address" required>
          <input
            autoComplete="email"
            className={controlClasses(errors.email)}
            id="email"
            maxLength={bookingFieldLimits.email}
            name="email"
            onChange={(event) => setFieldValue('email', event.target.value)}
            ref={(element) => { fieldRefs.current.email = element; }}
            required
            type="email"
            value={values.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
          />
        </BookingField>
      </div>

      <BookingField error={errors.phone} htmlFor="phone" hint="Optional. Include the format you normally use." label="Phone number">
        <input
          autoComplete="tel"
          className={controlClasses(errors.phone)}
          id="phone"
          maxLength={bookingFieldLimits.phone}
          name="phone"
          onChange={(event) => setFieldValue('phone', event.target.value)}
          ref={(element) => { fieldRefs.current.phone = element; }}
          type="tel"
          value={values.phone}
          aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
          aria-invalid={Boolean(errors.phone)}
        />
      </BookingField>

      <BookingField error={errors.serviceSlug} htmlFor="service" label="Photography service" required>
        <select
          className={controlClasses(errors.serviceSlug)}
          id="service"
          name="serviceSlug"
          onChange={(event) => setFieldValue('serviceSlug', event.target.value)}
          ref={(element) => { fieldRefs.current.serviceSlug = element; }}
          required
          value={values.serviceSlug}
          aria-describedby={errors.serviceSlug ? 'service-error' : undefined}
          aria-invalid={Boolean(errors.serviceSlug)}
        >
          <option value="">Choose a service</option>
          {photographyServices.map((service) => (
            <option key={service.id} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </BookingField>

      <div className="grid gap-7 sm:grid-cols-2">
        <BookingField error={errors.preferredDate} htmlFor="preferred-date" hint="This is a preference, not confirmed availability." label="Preferred session date" required>
          <input
            className={controlClasses(errors.preferredDate)}
            id="preferred-date"
            min={getLocalDateInputValue()}
            name="preferredDate"
            onChange={(event) => setFieldValue('preferredDate', event.target.value)}
            ref={(element) => { fieldRefs.current.preferredDate = element; }}
            required
            type="date"
            value={values.preferredDate}
            aria-describedby={errors.preferredDate ? 'preferred-date-error' : 'preferred-date-hint'}
            aria-invalid={Boolean(errors.preferredDate)}
          />
        </BookingField>

        <BookingField error={errors.preferredTime} htmlFor="preferred-time" label="Preferred time">
          <input
            className={controlClasses(errors.preferredTime)}
            id="preferred-time"
            name="preferredTime"
            onChange={(event) => setFieldValue('preferredTime', event.target.value)}
            ref={(element) => { fieldRefs.current.preferredTime = element; }}
            type="time"
            value={values.preferredTime}
            aria-describedby={errors.preferredTime ? 'preferred-time-error' : undefined}
            aria-invalid={Boolean(errors.preferredTime)}
          />
        </BookingField>
      </div>

      <BookingField error={errors.location} htmlFor="location" hint="Share a location, or let us know if you are still deciding." label="Location">
        <input
          autoComplete="street-address"
          className={controlClasses(errors.location)}
          id="location"
          maxLength={bookingFieldLimits.location}
          name="location"
          onChange={(event) => setFieldValue('location', event.target.value)}
          ref={(element) => { fieldRefs.current.location = element; }}
          type="text"
          value={values.location}
          aria-describedby={errors.location ? 'location-error' : 'location-hint'}
          aria-invalid={Boolean(errors.location)}
        />
      </BookingField>

      <BookingField error={errors.details} htmlFor="details" hint="For example: the type of shoot, creative concept, event details, participant count, or special requirements." label="Additional details" required>
        <textarea
          className={`${controlClasses(errors.details)} min-h-36 resize-y`}
          id="details"
          maxLength={bookingFieldLimits.details}
          name="details"
          onChange={(event) => setFieldValue('details', event.target.value)}
          ref={(element) => { fieldRefs.current.details = element; }}
          required
          value={values.details}
          aria-describedby={errors.details ? 'details-error' : 'details-hint'}
          aria-invalid={Boolean(errors.details)}
        />
      </BookingField>

      <div className="border-t border-brand/20 pt-6">
        <p className="text-sm leading-relaxed text-soft">
          Review your information before copying it for manual sharing. This does not submit or confirm a booking.
        </p>
        <button
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:w-auto"
          type="submit"
        >
          Review Enquiry
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
