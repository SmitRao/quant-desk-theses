import { Thesis } from '@/lib/types'

interface Props {
  thesis: Thesis
}

export default function ThesisCard({ thesis }: Props) {
  const hasPosition = thesis.ranked_ticket !== 'NONE'
  const isLong = hasPosition && thesis.levels.targets.length > 0
  const isSampleOnly = thesis.sample_ui_only === true
  
  return (
    <div className={`panel p-3 sm:p-4 flex flex-col h-full ${isSampleOnly ? 'border-dashed border-[#333]' : ''}`}>
      {/* Sample badge */}
      {isSampleOnly && (
        <div className="mb-2 -mt-1">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded bg-[#1a1a00] text-yellow-600 border border-yellow-900">
            Sample UI Only — Not a Live Rank
          </span>
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-[#222]">
        <div className="flex-1">
          <div className="text-dim text-xs uppercase tracking-wider mb-1">
            {thesis.author}
          </div>
          <h3 className="font-semibold text-white text-sm leading-tight">
            {thesis.title}
          </h3>
        </div>
        
        {hasPosition ? (
          <div className={`px-2 py-1 rounded text-xs font-mono ${
            isLong ? 'bg-[#0a2a0a] text-green border border-[#00c853]' : 'bg-[#2a0a0a] text-red border border-[#ff1744]'
          }`}>
            {thesis.ranked_ticket}
          </div>
        ) : (
          <div className="px-2 py-1 rounded text-xs font-mono bg-[#1a1a1a] text-muted border border-[#333]">
            NONE
          </div>
        )}
      </div>
      
      {/* Thesis */}
      <div className="mb-4">
        <p className="text-sm text-[#c0c0c0] leading-relaxed">
          {thesis.thesis}
        </p>
      </div>
      
      {/* Support Statements */}
      <div className="mb-4 flex-1">
        <div className="text-dim text-xs uppercase tracking-wider mb-2">
          Support / Reasoning
        </div>
        <ul className="space-y-2">
          {thesis.support_statements.map((statement, idx) => (
            <li key={idx} className="text-xs text-[#a0a0a0] leading-relaxed flex gap-2">
              <span className="text-dim shrink-0">•</span>
              <span>{statement}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Levels */}
      {hasPosition && (
        <div className="border-t border-[#222] pt-3 mt-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
            <div>
              <div className="text-dim uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Entry</div>
              <div className="font-mono text-white text-xs sm:text-sm">{thesis.levels.entry}</div>
            </div>
            <div>
              <div className="text-dim uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Invalidation</div>
              <div className="font-mono text-red text-xs sm:text-sm">{thesis.levels.invalidation}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-dim uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Max Loss</div>
              <div className="font-mono text-red text-xs sm:text-sm">{thesis.max_loss}</div>
            </div>
          </div>
          
          {thesis.levels.targets.length > 0 && (
            <div className="mt-3">
              <div className="text-dim text-[10px] sm:text-xs uppercase tracking-wider mb-1">Targets</div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {thesis.levels.targets.map((target, idx) => (
                  <span key={idx} className="font-mono text-green text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#0a1a0a] rounded border border-[#1a3a1a]">
                    T{idx + 1}: {target}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {!hasPosition && (
        <div className="border-t border-[#222] pt-3 mt-auto">
          <div className="text-xs text-muted">
            <span className="font-mono">Max Loss:</span> {thesis.max_loss}
          </div>
        </div>
      )}
    </div>
  )
}
