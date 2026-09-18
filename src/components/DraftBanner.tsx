/**
 * Draft ribbon. Stays until PR Editor clears copy for soft launch — see the
 * go-live checklist in the README.
 */
export default function DraftBanner() {
  return (
    <div className="draft-texture border-b border-desk-draft/25 bg-desk-draft/[0.04]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-4 py-2 sm:px-6">
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-desk-draft/70"
        />
        <span className="font-mono text-[10px] font-medium tracking-[0.18em] text-desk-draft uppercase sm:text-[11px]">
          Draft — not live — internal use only
        </span>
      </div>
    </div>
  )
}
