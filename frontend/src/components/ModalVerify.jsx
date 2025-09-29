export default function ModalVerify({ open, result, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Quality verification"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.25),transparent_60%)]" />
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Verifying Produce Quality
          </h3>
          <button
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close"
            disabled={result === null}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293A1 1 0 114.293 14.293L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          {result === null && (
            <div className="flex flex-col items-center py-8">
              {/* Loader */}
              <div className="relative">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Processing sensor checks and quality metrics...
              </p>
            </div>
          )}

          {result === "pass" && (
            <div className="flex flex-col items-center py-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg
                  className="h-7 w-7 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="mt-3 text-base font-semibold text-gray-900">
                Quality Verified
              </h4>
              <p className="mt-1 text-sm text-gray-600 text-center">
                Product passed verification and can be listed on the
                marketplace.
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Continue
              </button>
            </div>
          )}

          {result === "fail" && (
            <div className="flex flex-col items-center py-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                <svg
                  className="h-7 w-7 text-rose-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h4 className="mt-3 text-base font-semibold text-gray-900">
                Quality Not Met
              </h4>
              <p className="mt-1 text-sm text-gray-600 text-center">
                Please review moisture, contamination, and packaging before
                listing again.
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-rose-300 hover:text-rose-700"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
