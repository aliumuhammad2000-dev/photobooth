import { startTransition, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import BookingField from './BookingField';
import BookingSummary from './BookingSummary';
import BookingSuccess from './BookingSuccess';
import { emptyBookingValues } from '../../data/booking';
import { photographyServices } from '../../data/services';
import { createEnquiry, EnquiryApiError } from '../../services/enquiryApi';
import type { BookingErrors, BookingFieldName, BookingFormValues } from '../../types/booking';
import type { Enquiry } from '../../types/enquiry';
import { bookingFieldLimits, formatEnquiryDetails, getLocalDateInputValue, normalizeBookingValues, validateBooking } from '../../utils/bookingValidation';

interface BookingFormProps {
  initialServiceSlug?: string;
}

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

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
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [savedEnquiry, setSavedEnquiry] = useState<Enquiry | null>(null);
  const [hasAttemptedReview, setHasAttemptedReview] = useState(false);
  const fieldRefs = useRef<Partial<Record<BookingFieldName, FieldElement | null>>>({});
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusFormAfterEdit = useRef(false);

  useEffect(() => {
    if (!initialServiceSlug) {
      return;
    }

    startTransition(() => {
      setValues((current) =>
        current.serviceSlug === initialServiceSlug
          ? current
          : { ...current, serviceSlug: initialServiceSlug },
      );
      setErrors((current) => {
        if (!current.serviceSlug) {
          return current;
        }

        const next = { ...current };
        delete next.serviceSlug;
        return next;
      });
    });
  }, [initialServiceSlug]);

  useEffect(() => {
    if (step === 'form' && focusFormAfterEdit.current) {
      focusFormAfterEdit.current = false;
      window.requestAnimationFrame(() => formHeadingRef.current?.focus());
    }
  }, [step]);

  const setFieldValue = (field: BookingFieldName, value: string) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    if (hasAttemptedReview || errors[field]) {
      const fieldError = validateBooking(normalizeBookingValues(nextValues))[field];
      setErrors((current) => {
        if (fieldError) {
          return { ...current, [field]: fieldError };
        }

        if (!current[field]) {
          return current;
        }

        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const reviewEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedReview(true);
    const normalizedValues = normalizeBookingValues(values);
    const nextErrors = validateBooking(normalizedValues);

    setValues(normalizedValues);
    setErrors(nextErrors);
    setCopyStatus('idle');
    setSubmissionStatus('idle');
    setSubmissionError(null);

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
      await navigator.clipboard.writeText(
        formatEnquiryDetails(values, selectedService.name, savedEnquiry !== null),
      );
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
  };

  const submitDemoEnquiry = async () => {
    if (submissionStatus === 'loading') {
      return;
    }

    setSubmissionStatus('loading');
    setSubmissionError(null);

    try {
      const saved = await createEnquiry(values);
      setSavedEnquiry(saved);
      setSubmissionStatus('success');
      setCopyStatus('idle');
      setStep('success');
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionError(
        error instanceof EnquiryApiError && error.kind === 'http'
          ? 'The local demo API could not save this enquiry. Check the server response and try again.'
          : error instanceof EnquiryApiError && error.kind === 'invalid-response'
            ? 'The local demo API returned an unexpected result. Your enquiry was not confirmed as saved.'
            : 'Unable to reach the local demo API. Check that JSON Server is running and try again.',
      );
    }
  };

  const startNewDemoEnquiry = () => {
    setValues({ ...emptyBookingValues, serviceSlug: initialServiceSlug });
    setErrors({});
    setCopyStatus('idle');
    setSubmissionStatus('idle');
    setSubmissionError(null);
    setSavedEnquiry(null);
    setHasAttemptedReview(false);
    focusFormAfterEdit.current = true;
    setStep('form');
  };

  if (step === 'success' && savedEnquiry) {
    return (
      <BookingSuccess
        copyStatus={copyStatus}
        enquiry={savedEnquiry}
        onCopy={copyEnquiry}
        onStartOver={startNewDemoEnquiry}
      />
    );
  }

  if (step === 'review' && selectedService) {
    return (
      <BookingSummary
        copyStatus={copyStatus}
        isDevelopment={import.meta.env.DEV}
        isSubmitting={submissionStatus === 'loading'}
        onCopy={copyEnquiry}
        onEdit={() => {
          focusFormAfterEdit.current = true;
          setSubmissionStatus('idle');
          setSubmissionError(null);
          setStep('form');
        }}
        onSubmit={submitDemoEnquiry}
        submissionError={submissionError}
        service={selectedService}
        values={values}
      />
    );
  }

  return (
    <form className="space-y-7" noValidate onSubmit={reviewEnquiry}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
          YOUR ENQUIRY
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-cream" id="booking-form-heading" ref={formHeadingRef} tabIndex={-1}>
          Tell us about your session.
        </h2>
      </div>
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
