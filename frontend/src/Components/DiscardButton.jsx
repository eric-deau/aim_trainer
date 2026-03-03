export default function DiscardButton({onClose, submitting, success}) {
    return (
        <>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting || success}
              className="flex-1 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white ring-2 ring-red-200 hover:bg-red-200 disabled:opacity-50"
            >
              Discard
            </button>
        </>
    )
}