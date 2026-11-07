import type { ReactNode } from "react";

/**
 * Line-art spot illustrations for the six hiring steps. One style: navy
 * 2.5px strokes, round joins, flat fills from the logo palette.
 */
const ink = "#071330";
const s = {
  stroke: ink,
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 220" className="size-full" aria-hidden fill="none">
      {children}
    </svg>
  );
}

/** 1 · Requirement understanding: a brief on a clipboard, a pen and a speech bubble. */
function Brief() {
  return (
    <Frame>
      <rect x="40" y="40" width="96" height="132" rx="8" fill="#e6f4ff" {...s} />
      <rect x="66" y="32" width="44" height="18" rx="5" fill="#ffffff" {...s} />
      {[72, 96, 120, 144].map((y, i) => (
        <g key={y}>
          <rect x="54" y={y - 7} width="13" height="13" rx="3" fill={i < 3 ? "#007dfb" : "#ffffff"} {...s} />
          {i < 3 && <path d={`M57 ${y} l3 3 5-6`} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />}
          <path d={`M76 ${y}h${i % 2 ? 34 : 46}`} {...s} />
        </g>
      ))}
      <path d="M150 64 176 38l10 10-26 26-14 4z" fill="#ff9702" {...s} />
      <path d="M140 150c0-14 12-24 28-24s28 10 28 24-12 24-28 24c-5 0-9-1-13-3l-12 6 3-11c-4-4-6-10-6-16z" fill="#ffffff" {...s} />
      <path d="M156 146h24M156 156h16" {...s} />
    </Frame>
  );
}

/** 2 · Talent sourcing: a magnifier over a grid of people. */
function Sourcing() {
  const people = [
    [40, 50], [80, 50], [120, 50],
    [40, 100], [80, 100], [120, 100],
    [40, 150], [80, 150], [120, 150],
  ];
  return (
    <Frame>
      {people.map(([x, y], i) => (
        <g key={i} opacity={i === 4 ? 1 : 0.55}>
          <circle cx={x} cy={y - 8} r="8" fill={i === 4 ? "#01bfa3" : "#ffffff"} {...s} />
          <path d={`M${x - 13} ${y + 16}c0-9 6-14 13-14s13 5 13 14`} fill={i === 4 ? "#01bfa3" : "#ffffff"} {...s} />
        </g>
      ))}
      <circle cx="96" cy="104" r="34" fill="#ffffff" fillOpacity="0.35" {...s} strokeWidth={4} />
      <path d="m121 129 34 34" {...s} strokeWidth={9} />
      <path d="m121 129 34 34" stroke="#740cf5" strokeWidth="4" strokeLinecap="round" />
    </Frame>
  );
}

/** 3 · Candidate screening: a call with a candidate, waveform and notes. */
function Screening() {
  return (
    <Frame>
      <rect x="52" y="24" width="84" height="160" rx="14" fill="#ffffff" {...s} />
      <path d="M82 34h24" {...s} />
      <circle cx="94" cy="78" r="18" fill="#f1e9fe" {...s} />
      <circle cx="94" cy="72" r="7" fill="#740cf5" {...s} />
      <path d="M82 90c2-7 6-10 12-10s10 3 12 10" fill="#740cf5" {...s} />
      <path d="M66 120v10M74 114v22M82 108v34M90 116v18M98 104v42M106 114v22M114 120v10M122 116v18" {...s} />
      <circle cx="80" cy="164" r="9" fill="#01bfa3" {...s} />
      <circle cx="108" cy="164" r="9" fill="#ff5a5a" {...s} />
      <rect x="132" y="96" width="52" height="64" rx="6" fill="#fff2df" {...s} />
      <path d="M142 112h32M142 124h24M142 136h28M142 148h18" {...s} />
    </Frame>
  );
}

/** 4 · Shortlist and submission: stacked profile cards with a rosette. */
function Shortlist() {
  return (
    <Frame>
      <rect x="54" y="60" width="96" height="120" rx="8" fill="#ffffff" {...s} transform="rotate(-8 102 120)" />
      <rect x="50" y="52" width="96" height="120" rx="8" fill="#ffffff" {...s} transform="rotate(5 98 112)" />
      <rect x="46" y="44" width="96" height="120" rx="8" fill="#e6f4ff" {...s} />
      <circle cx="94" cy="84" r="20" fill="#ffffff" {...s} />
      <circle cx="94" cy="78" r="8" fill="#007dfb" {...s} />
      <path d="M80 98c2-8 7-11 14-11s12 3 14 11" fill="#007dfb" {...s} />
      <path d="M64 124h60M64 136h44M64 148h52" {...s} />
      <circle cx="146" cy="52" r="20" fill="#ff9702" {...s} />
      <path d="m137 52 6 6 12-13" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m136 70-6 24 14-8 6 14 4-26" fill="#ff9702" {...s} />
    </Frame>
  );
}

/** 5 · Interview coordination: a calendar with booked slots and a nudge. */
function Interviews() {
  return (
    <Frame>
      <rect x="30" y="44" width="124" height="124" rx="10" fill="#ffffff" {...s} />
      <path d="M30 74h124" {...s} />
      <rect x="30" y="44" width="124" height="30" rx="10" fill="#007dfb" {...s} />
      <path d="M58 34v20M126 34v20" {...s} strokeWidth={4} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const booked = (r === 1 && c === 1) || (r === 2 && c === 3) || (r === 3 && c === 0);
          return (
            <rect
              key={`${r}${c}`}
              x={42 + c * 27}
              y={84 + r * 20}
              width="18"
              height="12"
              rx="3"
              fill={booked ? "#01bfa3" : "#ffffff"}
              {...s}
              strokeWidth={2}
            />
          );
        }),
      )}
      <path d="M136 132c0-12 10-20 24-20s24 8 24 20-10 20-24 20c-4 0-8-1-11-2l-11 6 3-10c-3-4-5-9-5-14z" fill="#fff2df" {...s} />
      <path d="M152 128v6M160 124v10M168 128v6" {...s} />
    </Frame>
  );
}

/** 6 · Offer and joining: an offer letter with a celebration. */
function Joining() {
  return (
    <Frame>
      <path d="M36 96 100 54l64 42v80a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6z" fill="#ffffff" {...s} />
      <rect x="56" y="62" width="88" height="86" rx="6" fill="#e0f7f2" {...s} />
      <path d="M70 82h44M70 96h60M70 110h36" {...s} />
      <path d="M36 96l64 46 64-46" fill="#ffffff" {...s} />
      <circle cx="122" cy="124" r="11" fill="#01bfa3" {...s} />
      <path d="m117 124 4 4 7-8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 34l4 10M30 46l10 2M160 30l-3 10M172 44l-10 2M100 20v10" {...s} />
      <circle cx="56" cy="24" r="4" fill="#ff9702" />
      <circle cx="146" cy="18" r="4" fill="#740cf5" />
      <circle cx="180" cy="64" r="4" fill="#00c2ff" />
    </Frame>
  );
}

export const stepIllustrations = [Brief, Sourcing, Screening, Shortlist, Interviews, Joining];
