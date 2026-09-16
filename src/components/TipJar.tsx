'use client'

export default function TipJar() {
  const tipUrl = process.env.NEXT_PUBLIC_TIP_URL || ''
  const hasUrl = tipUrl.trim().length > 0
  
  if (hasUrl) {
    return (
      <a
        href={tipUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#333] bg-[#1a1a1a] hover:bg-[#222] hover:border-[#444] transition-colors text-xs text-[#888] hover:text-[#aaa]"
      >
        <span className="text-[#555]">💳</span>
        <span>Tip the desk via Stripe</span>
      </a>
    )
  }
  
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#222] bg-[#111] text-xs text-[#444] cursor-not-allowed">
      <span className="text-[#333]">💳</span>
      <span>Tip jar coming soon</span>
    </span>
  )
}
