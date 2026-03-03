
export default function SubmitButton( {onSubmit, submitting, success}) {
    return (
        <>
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting || success}
              className="flex-1 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-200 ring-2 ring-green-200 disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-white" />
                  Submitting…
                </>
              ) : success ? (
                "Submitted"
              ) : (
                "Submit"
              )}
            </button>
        </>
    )

}