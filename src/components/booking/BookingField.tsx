import type { ReactNode } from 'react';

interface BookingFieldProps {
  children: ReactNode;
  error?: string;
  hint?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
}

function BookingField({
  children,
  error,
  hint,
  htmlFor,
  label,
  required = false,
}: BookingFieldProps) {
  const hintId = `${htmlFor}-hint`;
  const errorId = `${htmlFor}-error`;

  return (
    <div>
      <label className="block text-sm font-semibold text-cream" htmlFor={htmlFor}>
        {label}
        {required && <span aria-hidden="true" className="ml-1 text-brand">*</span>}
      </label>
      {hint && (
        <p className="mt-2 text-xs leading-relaxed text-soft" id={hintId}>
          {hint}
        </p>
      )}
      <div className={hint ? 'mt-3' : 'mt-2'}>{children}</div>
      {error && (
        <p className="mt-2 text-sm leading-relaxed text-cream" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default BookingField;
