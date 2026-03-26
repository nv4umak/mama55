/**
 * Minimalist festive background pattern:
 * ✦ sparkle stars, ◆ diamonds, · dots — in a 120×120px repeating tile
 */
export default function BgPattern() {
  return (
    <svg
      className="bg-pattern"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="festive-tile"
          x="0" y="0"
          width="120" height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* ✦ Large sparkle — upper left */}
          <path
            d="M0,-7 L2.8,-2.8 L7,0 L2.8,2.8 L0,7 L-2.8,2.8 L-7,0 L-2.8,-2.8Z"
            transform="translate(22,24)"
            fill="rgba(175,90,70,0.16)"
          />

          {/* ◆ Diamond — upper right */}
          <rect
            x="-3.5" y="-3.5" width="7" height="7" rx="0.8"
            transform="translate(97,17) rotate(45)"
            fill="rgba(190,145,55,0.15)"
          />

          {/* · Dot — lower left */}
          <circle cx="18" cy="97" r="3.2" fill="rgba(175,90,70,0.12)" />

          {/* ✦ Small sparkle — lower right */}
          <path
            d="M0,-4.5 L1.8,-1.8 L4.5,0 L1.8,1.8 L0,4.5 L-1.8,1.8 L-4.5,0 L-1.8,-1.8Z"
            transform="translate(100,94)"
            fill="rgba(175,90,70,0.13)"
          />

          {/* ◆ Small diamond — center-ish */}
          <rect
            x="-2.2" y="-2.2" width="4.4" height="4.4" rx="0.4"
            transform="translate(63,38) rotate(45)"
            fill="rgba(190,145,55,0.12)"
          />

          {/* · Small dot — lower center */}
          <circle cx="44" cy="76" r="2" fill="rgba(175,90,70,0.10)" />

          {/* · Tiny dot — top center */}
          <circle cx="72" cy="9" r="1.6" fill="rgba(175,90,70,0.09)" />

          {/* ✦ Tiny sparkle — mid left */}
          <path
            d="M0,-3 L1.2,-1.2 L3,0 L1.2,1.2 L0,3 L-1.2,1.2 L-3,0 L-1.2,-1.2Z"
            transform="translate(8,55)"
            fill="rgba(190,145,55,0.10)"
          />

          {/* · Tiny dot — mid right */}
          <circle cx="112" cy="58" r="1.4" fill="rgba(190,145,55,0.09)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#festive-tile)" />
    </svg>
  )
}
