import Panel from './ui/Panel'
import SectionHeader from './ui/SectionHeader'

/**
 * Tip jar — intentionally a disabled placeholder.
 *
 * The live destination is a Stripe Payment Link supplied by the desk owner via
 * `NEXT_PUBLIC_TIP_URL`, and the public brand name still needs PR Editor sign-off.
 * Never hardcode a payment URL or a brand name here.
 */
export default function TipJar() {
  const tipUrl = (process.env.NEXT_PUBLIC_TIP_URL ?? '').trim()
  const isEnabled = tipUrl.length > 0

  return (
    <Panel as="section">
      <SectionHeader
        index="04"
        label="Tip jar"
        title="Support the desk"
        meta={
          <span className="eyebrow rounded-md border border-desk-line bg-desk-raised px-2 py-1.5">
            {isEnabled ? 'Stripe Payment Link' : 'Placeholder — disabled'}
          </span>
        }
      />

      <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-xl text-[13px] leading-relaxed text-desk-dim sm:text-sm">
          A tip jar will sit here once the desk&apos;s Stripe Payment Link and public
          name are confirmed. Nothing is collected today, and no payment
          destination is configured in this build.
        </p>

        {isEnabled ? (
          <a
            href={tipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-desk-line-strong bg-desk-raised px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-desk-text uppercase transition-colors hover:border-desk-flat/40 hover:text-white"
          >
            Tip the desk
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-dashed border-desk-line bg-desk-surface px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-desk-muted uppercase"
          >
            Tip jar coming soon
          </span>
        )}
      </div>
    </Panel>
  )
}
