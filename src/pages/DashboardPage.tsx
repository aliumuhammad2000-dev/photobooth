import { useEffect, useMemo, useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import EnquiryDetails from '../components/dashboard/EnquiryDetails';
import EnquiryFilters, { type EnquiryFilter } from '../components/dashboard/EnquiryFilters';
import EnquiryList from '../components/dashboard/EnquiryList';
import EnquiryStats from '../components/dashboard/EnquiryStats';
import { deleteEnquiry, EnquiryApiError, getEnquiries, updateEnquiryStatus } from '../services/enquiryApi';
import { enquiryStatuses, type Enquiry, type EnquiryStatus } from '../types/enquiry';

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

function DashboardPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('loading');
  const [requestError, setRequestError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<EnquiryFilter>('all');
  const [query, setQuery] = useState('');
  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    getEnquiries()
      .then((nextEnquiries) => {
        if (!isActive) return;
        setEnquiries(nextEnquiries);
        setRequestStatus('success');
      })
      .catch(() => {
        if (!isActive) return;
        setRequestStatus('error');
        setRequestError('Unable to load the local demo enquiries. Check that the mock API is running.');
      });

    return () => { isActive = false; };
  }, [retryToken]);

  const sortedEnquiries = useMemo(
    () => [...enquiries].sort((first, second) => {
      const firstTime = Date.parse(first.createdAt);
      const secondTime = Date.parse(second.createdAt);
      if (Number.isNaN(firstTime) || Number.isNaN(secondTime)) return 0;
      return secondTime - firstTime;
    }),
    [enquiries],
  );

  const filteredEnquiries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return sortedEnquiries.filter((enquiry) => {
      const matchesStatus = filter === 'all' || enquiry.status === filter;
      const serviceName = enquiry.serviceSlug.replaceAll('-', ' ');
      const matchesSearch = !normalizedQuery || [enquiry.fullName, enquiry.email, serviceName]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesSearch;
    });
  }, [filter, query, sortedEnquiries]);

  const selectedEnquiry = enquiries.find((enquiry) => enquiry.id === selectedId) ?? null;

  const retryDashboard = () => {
    setRequestStatus('loading');
    setRequestError(null);
    setRetryToken((current) => current + 1);
  };

  const handleStatusChange = async (status: EnquiryStatus) => {
    if (!selectedEnquiry || status === selectedEnquiry.status || pendingStatusId) return;
    if (!enquiryStatuses.includes(status)) return;

    setPendingStatusId(selectedEnquiry.id);
    setStatusError(null);
    try {
      const updated = await updateEnquiryStatus(selectedEnquiry.id, status);
      setEnquiries((current) => current.map((enquiry) => enquiry.id === updated.id ? updated : enquiry));
    } catch (error) {
      setStatusError(error instanceof EnquiryApiError && error.kind === 'http'
        ? 'The status could not be saved. Check the mock API response and try again.'
        : 'The status could not be saved because the mock API is unavailable. Your original status is unchanged.');
    } finally {
      setPendingStatusId(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedEnquiry || deletingId) return;
    setDeletingId(selectedEnquiry.id);
    setDeleteError(null);
    try {
      await deleteEnquiry(selectedEnquiry.id);
      setEnquiries((current) => current.filter((enquiry) => enquiry.id !== selectedEnquiry.id));
      setSelectedId(null);
      setDeleteConfirmId(null);
    } catch {
      setDeleteError('The demo enquiry could not be deleted. It remains visible; check the mock API and try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex-1 bg-canvas px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <DashboardHeader />

        {requestStatus === 'loading' && (
          <p aria-live="polite" className="mt-10 rounded-sm border border-brand/20 bg-surface p-6 text-brand" role="status">
            Loading demo enquiries…
          </p>
        )}

        {requestStatus === 'error' && (
          <section aria-live="assertive" className="mt-10 rounded-sm border border-cream/30 bg-surface p-6" role="alert">
            <h2 className="font-serif text-3xl text-cream">We could not load the dashboard.</h2>
            <p className="mt-3 text-soft">{requestError}</p>
            <button className="mt-5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" onClick={retryDashboard} type="button">
              Retry
            </button>
          </section>
        )}

        {requestStatus === 'success' && (
          <div className="mt-10 space-y-8">
            <EnquiryStats enquiries={enquiries} />

            {enquiries.length === 0 ? (
              <section className="rounded-sm border border-brand/20 bg-surface p-8 text-center">
                <h2 className="font-serif text-3xl text-cream">No demo enquiries yet.</h2>
                <p className="mx-auto mt-3 max-w-lg text-soft">Submit a fictional enquiry through /book-session and it will appear here.</p>
              </section>
            ) : (
              <>
                <EnquiryFilters filter={filter} onFilterChange={setFilter} onQueryChange={setQuery} query={query} />
                {filteredEnquiries.length === 0 ? (
                  <p className="rounded-sm border border-brand/20 bg-surface p-8 text-center text-soft">No enquiries match these filters.</p>
                ) : (
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:items-start">
                    <section aria-labelledby="enquiry-list-heading">
                      <div className="mb-4 flex items-baseline justify-between gap-4">
                        <h2 className="font-serif text-3xl text-cream" id="enquiry-list-heading">Recent enquiries</h2>
                        <p className="text-sm text-soft">{filteredEnquiries.length} shown</p>
                      </div>
                      <EnquiryList enquiries={filteredEnquiries} onSelect={setSelectedId} selectedId={selectedId} />
                    </section>
                    {selectedEnquiry ? (
                      <EnquiryDetails
                        deleteError={deleteError}
                        enquiry={selectedEnquiry}
                        isDeletePending={deleteConfirmId === selectedEnquiry.id}
                        isDeleting={deletingId === selectedEnquiry.id}
                        isUpdatingStatus={pendingStatusId === selectedEnquiry.id}
                        onCancelDelete={() => setDeleteConfirmId(null)}
                        onConfirmDelete={handleDelete}
                        onRequestDelete={() => { setDeleteError(null); setDeleteConfirmId(selectedEnquiry.id); }}
                        onStatusChange={handleStatusChange}
                        statusError={statusError}
                      />
                    ) : (
                      <aside className="rounded-sm border border-dashed border-brand/30 p-6 text-soft">Select an enquiry to inspect its complete details.</aside>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
