import type { ReactNode } from 'react';
import type { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { enquiryStatuses } from '../../types/enquiry';
import { formatCalendarDate, formatTimestamp, getServiceName, getStatusLabel } from '../../utils/enquiryFormatting';

interface EnquiryDetailsProps {
  enquiry: Enquiry;
  statusError: string | null;
  deleteError: string | null;
  isUpdatingStatus: boolean;
  isDeleting: boolean;
  isDeletePending: boolean;
  onStatusChange: (status: EnquiryStatus) => void;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

function EnquiryDetails({
  deleteError,
  enquiry,
  isDeletePending,
  isDeleting,
  isUpdatingStatus,
  onCancelDelete,
  onConfirmDelete,
  onRequestDelete,
  onStatusChange,
  statusError,
}: EnquiryDetailsProps) {
  return (
    <aside aria-labelledby="selected-enquiry-heading" className="self-start rounded-sm border border-brand/30 bg-surface p-6 lg:sticky lg:top-28">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">FULL ENQUIRY</p>
      <h2 className="mt-3 break-words font-serif text-3xl leading-tight text-cream" id="selected-enquiry-heading">
        {enquiry.fullName}
      </h2>
      <dl className="mt-6 divide-y divide-brand/15 border-y border-brand/15">
        <DetailRow label="Email"><a className="break-words text-brand underline-offset-4 hover:underline" href={`mailto:${enquiry.email}`}>{enquiry.email}</a></DetailRow>
        {enquiry.phone && <DetailRow label="Phone">{enquiry.phone}</DetailRow>}
        <DetailRow label="Service">{getServiceName(enquiry.serviceSlug)}</DetailRow>
        <DetailRow label="Preferred date">{formatCalendarDate(enquiry.preferredDate)}</DetailRow>
        {enquiry.preferredTime && <DetailRow label="Preferred time">{enquiry.preferredTime}</DetailRow>}
        {enquiry.location && <DetailRow label="Location">{enquiry.location}</DetailRow>}
        <DetailRow label="Created">{formatTimestamp(enquiry.createdAt)}</DetailRow>
        <DetailRow label="Demo record ID"><span className="break-all font-mono text-xs">{enquiry.id}</span></DetailRow>
        <DetailRow label="Details"><span className="whitespace-pre-wrap">{enquiry.details}</span></DetailRow>
      </dl>

      <div className="mt-6">
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-brand" htmlFor="enquiry-status">
          Status
        </label>
        <select
          className="mt-3 w-full rounded-sm border border-brand/25 bg-canvas px-4 py-3 text-base text-cream outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 disabled:cursor-wait disabled:opacity-70"
          disabled={isUpdatingStatus || isDeleting}
          id="enquiry-status"
          onChange={(event) => onStatusChange(event.target.value as EnquiryStatus)}
          value={enquiry.status}
        >
          {enquiryStatuses.map((status) => <option key={status} value={status}>{getStatusLabel(status)}</option>)}
        </select>
        {isUpdatingStatus && <p aria-live="polite" className="mt-3 text-sm text-brand" role="status">Saving status…</p>}
        {statusError && <p aria-live="assertive" className="mt-3 text-sm text-cream" role="alert">{statusError}</p>}
      </div>

      <div className="mt-8 border-t border-brand/15 pt-6">
        {!isDeletePending ? (
          <button className="rounded-full border border-cream/40 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:opacity-60" disabled={isUpdatingStatus || isDeleting} onClick={onRequestDelete} type="button">
            Delete demo enquiry
          </button>
        ) : (
          <div className="rounded-sm border border-cream/30 p-4">
            <p className="text-sm leading-relaxed text-cream">Delete this fictional demo enquiry? This cannot be undone in the local mock database.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:opacity-60" disabled={isDeleting} onClick={onConfirmDelete} type="button">{isDeleting ? 'Deleting…' : 'Confirm delete'}</button>
              <button className="rounded-full border border-brand/40 px-4 py-2 text-sm font-semibold text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:opacity-60" disabled={isDeleting} onClick={onCancelDelete} type="button">Cancel</button>
            </div>
          </div>
        )}
        {deleteError && <p aria-live="assertive" className="mt-3 text-sm text-cream" role="alert">{deleteError}</p>}
      </div>
    </aside>
  );
}

interface DetailRowProps { label: string; children: ReactNode }
function DetailRow({ children, label }: DetailRowProps) {
  return <div className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-soft">{label}</dt><dd className="min-w-0 break-words text-sm leading-relaxed text-cream">{children}</dd></div>;
}

export default EnquiryDetails;
