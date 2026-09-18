import { Thesis } from '@/lib/types'
import Panel from './ui/Panel'
import { cx } from '@/lib/cx'

interface Props {
  thesis: Thesis
  /**
   * `wide` is for days with a single thesis, where a one-column card would be
   * stranded in the section. It keeps the same reading order and puts the
   * reasoning and the levels side by side on desktop.
   */
  layout?: 'card' | 'wide'
}

/**
 * Content authors sometimes open a support statement with an explicit
 * "What would make us wrong:" prefix. Splitting it out gives the invalidation
 * reasoning its own line without changing a word of the copy.
 */
const WRONG_PREFIX = /^(what would make us wrong)\s*:\s*/i

function splitStatement(statement: string) {
  const match = statement.match(WRONG_PREFIX)

  if (!match) {
    return { label: null, body: statement }
  }

  return { label: match[1], body: statement.slice(match[0].length) }
}

function TicketTag({ thesis }: { thesis: Thesis }) {
  if (thesis.ranked_ticket === 'NONE') {
    return (
      <span className="shrink-0 rounded-md border border-desk-line bg-desk-raised px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-desk-muted uppercase">
        No ticket
      </span>
    )
  }

  const isLong = thesis.levels.targets.length > 0

  return (
    <span
      className={cx(
        'shrink-0 rounded-md border px-2 py-1 font-mono text-[11px] font-semibold tracking-[0.08em]',
        isLong
          ? 'border-desk-long/35 bg-desk-long/8 text-desk-long'
          : 'border-desk-short/35 bg-desk-short/8 text-desk-short'
      )}
    >
      {thesis.ranked_ticket}
    </span>
  )
}

function SupportList({ statements }: { statements: string[] }) {
  return (
    <>
      <div className="eyebrow">Support / reasoning</div>
      <ul className="mt-3 space-y-3">
        {statements.map((statement, index) => {
          const { label, body } = splitStatement(statement)

          return (
            <li key={index} className="flex gap-3">
              <span
                aria-hidden
                className={cx(
                  'mt-[0.55rem] h-px w-2.5 shrink-0',
                  label ? 'bg-desk-risk/70' : 'bg-desk-line-strong'
                )}
              />
              <span className="min-w-0 text-[13px] leading-[1.65]">
                {label ? (
                  <span className="mr-1.5 font-mono text-[10px] tracking-[0.12em] text-desk-risk uppercase">
                    {label}
                  </span>
                ) : null}
                <span className="text-desk-dim">{body}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function LevelsPanel({ thesis }: { thesis: Thesis }) {
  const hasPosition = thesis.ranked_ticket !== 'NONE'

  if (!hasPosition) {
    return (
      <div className="rounded-lg border border-desk-line bg-desk-raised/50 p-3.5">
        <div className="eyebrow">Max loss</div>
        <div className="tabular mt-1.5 font-mono text-sm text-desk-dim">
          {thesis.max_loss}
        </div>
        <div className="eyebrow mt-3.5">Invalidation</div>
        <div className="mt-1.5 font-mono text-[13px] break-words text-desk-dim">
          {thesis.levels.invalidation}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-desk-line bg-desk-raised/50 p-3.5">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3.5 sm:grid-cols-3">
        <div>
          <dt className="eyebrow">Entry</dt>
          <dd className="tabular mt-1.5 font-mono text-sm text-desk-text">
            {thesis.levels.entry}
          </dd>
        </div>
        <div>
          <dt className="eyebrow">Invalidation</dt>
          <dd className="tabular mt-1.5 font-mono text-sm text-desk-short">
            {thesis.levels.invalidation}
          </dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="eyebrow">Max loss</dt>
          <dd className="tabular mt-1.5 font-mono text-sm text-desk-short">
            {thesis.max_loss}
          </dd>
        </div>
      </dl>

      {thesis.levels.targets.length > 0 ? (
        <div className="mt-4 border-t border-desk-line pt-3.5">
          <div className="eyebrow">Targets</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {thesis.levels.targets.map((target, index) => (
              <span
                key={index}
                className="tabular rounded-md border border-desk-long/25 bg-desk-long/8 px-2 py-1 font-mono text-[11px] text-desk-long"
              >
                T{index + 1} {target}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function ThesisCard({ thesis, layout = 'card' }: Props) {
  const isSampleOnly = thesis.sample_ui_only === true
  const isWide = layout === 'wide'

  const badge = isSampleOnly ? (
    <span className="mb-3 self-start rounded-md border border-desk-draft/30 bg-desk-draft/8 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-desk-draft uppercase">
      Sample UI only — not a live rank
    </span>
  ) : null

  const header = (
    <header className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="eyebrow truncate">{thesis.author}</div>
        <h3 className="mt-2 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-balance text-white sm:text-base">
          {thesis.title}
        </h3>
      </div>
      <TicketTag thesis={thesis} />
    </header>
  )

  return (
    <Panel
      as="article"
      spotlight
      className={cx(
        'h-full',
        isSampleOnly && 'border-dashed border-desk-line-strong'
      )}
    >
      <div className={cx('flex flex-1 flex-col p-4 sm:p-5', isWide && 'lg:p-6')}>
        {badge}
        {header}

        <p
          className={cx(
            'mt-4 text-[13.5px] leading-[1.7] text-desk-dim sm:text-sm',
            isWide && 'max-w-3xl'
          )}
        >
          {thesis.thesis}
        </p>

        {isWide ? (
          <div className="mt-5 flex flex-col gap-6 border-t border-desk-line pt-4 lg:flex-row lg:gap-10">
            <div className="min-w-0 lg:flex-1">
              <SupportList statements={thesis.support_statements} />
            </div>
            <div className="lg:w-80 lg:shrink-0">
              <LevelsPanel thesis={thesis} />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 border-t border-desk-line pt-4">
              <SupportList statements={thesis.support_statements} />
            </div>
            <div className="mt-auto pt-5">
              <LevelsPanel thesis={thesis} />
            </div>
          </>
        )}
      </div>
    </Panel>
  )
}
