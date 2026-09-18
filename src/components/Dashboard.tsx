import { DayData } from '@/lib/types'
import DraftBanner from './DraftBanner'
import DeskHeader from './DeskHeader'
import DeskStatusStrip from './DeskStatusStrip'
import RankedBook from './RankedBook'
import ThesisCard from './ThesisCard'
import Disclaimer from './Disclaimer'
import TipJar from './TipJar'
import Panel from './ui/Panel'
import SectionHeader from './ui/SectionHeader'
import InView from './motion/InView'
import { cx } from '@/lib/cx'

interface Props {
  data: DayData
  currentDate: string
  availableDates: string[]
}

/**
 * Column counts are written out in full so Tailwind's scanner can see them.
 * A single thesis gets the wide card treatment instead of a stranded column.
 */
function thesisGridColumns(count: number): string {
  if (count <= 1) return ''
  if (count === 2) return 'md:grid-cols-2'
  return 'md:grid-cols-2 xl:grid-cols-3'
}

export default function Dashboard({ data, currentDate, availableDates }: Props) {
  const thesisCount = data.theses.length
  const isSoloThesis = thesisCount === 1

  return (
    <div className="flex min-h-screen flex-col">
      <DraftBanner />
      <DeskHeader currentDate={currentDate} availableDates={availableDates} />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pt-5 pb-12 sm:px-6 sm:pt-6 sm:pb-16">
        <div className="flex flex-col gap-4 sm:gap-6">
          <InView>
            <DeskStatusStrip data={data} />
          </InView>

          <InView delay={0.05}>
            <RankedBook
              tickets={data.ranked_book}
              deskStatus={data.desk_status}
            />
          </InView>

          {/* Theses reveal card by card rather than as one block, so the section
              chrome is never animated twice. */}
          <Panel as="section">
            <SectionHeader
              index="03"
              label="Theses"
              title="Today's reasoning, in plain English"
              meta={
                <span className="tabular font-mono text-xs text-desk-dim">
                  {thesisCount} {thesisCount === 1 ? 'thesis' : 'theses'}
                </span>
              }
            />

            <div
              className={cx(
                'grid gap-4 p-4 sm:p-6',
                thesisGridColumns(thesisCount)
              )}
            >
              {data.theses.map((thesis, index) => (
                <InView key={index} className="h-full" delay={index * 0.06}>
                  <ThesisCard
                    thesis={thesis}
                    layout={isSoloThesis ? 'wide' : 'card'}
                  />
                </InView>
              ))}
            </div>
          </Panel>

          <InView>
            <TipJar />
          </InView>

          <Disclaimer />
        </div>
      </main>

      <footer className="border-t border-desk-line">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="text-xs text-desk-muted">
            Agentic trading desk dashboard — draft build, not for distribution.
          </span>
          <span className="eyebrow">Noindex · nofollow</span>
        </div>
      </footer>
    </div>
  )
}
