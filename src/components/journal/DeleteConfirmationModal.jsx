import { useEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'

function DeleteConfirmationModal({ title, onCancel, onConfirm, error }) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    cancelRef.current?.focus()
    return () => { if (dialog.open) dialog.close() }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
      onCancel={(event) => { event.preventDefault(); onCancel() }}
      className="fixed inset-0 m-auto max-h-[90vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 text-charcoal shadow-xl backdrop:bg-black/35 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-warm-sand"><Trash2 size={25} aria-hidden="true" /></span>
        <h2 id="delete-title" className="text-2xl font-bold">Delete this entry?</h2>
      </div>
      <p id="delete-description" className="mt-5 break-words leading-relaxed">Are you sure you want to delete “{title}”? This action cannot be undone.</p>
      {error && <p role="alert" className="mt-3 text-sm text-red-800">{error}</p>}
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button ref={cancelRef} type="button" onClick={onCancel} className="rounded-full bg-soft-sage px-5 py-3 font-semibold hover:bg-soft-sage-dark">Cancel</button>
        <button type="button" onClick={onConfirm} className="rounded-full bg-[#99483f] px-5 py-3 font-semibold text-white hover:bg-[#803b34]">Delete Entry</button>
      </div>
    </dialog>
  )
}

export default DeleteConfirmationModal
