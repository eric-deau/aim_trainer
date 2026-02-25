export default function DiscardButton({onClose, submitting, success}) {
    return (
        <>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting || success}
              className="flex-1 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-50 disabled:opacity-50"
            >
              Discard
            </button>
        </>
    )
}