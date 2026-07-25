import { memo } from "react";

// Ink-on-paper passport stamp, rendered as SVG so it stays crisp and
// deterministic. Curved text top and bottom, a center glyph and label.
// The feTurbulence filter roughens the ink edges so it reads as pressed,
// not vector-clean. Uses multiply blend in the parent so it sinks into
// the cream paper.
function Stamp({
  className,
  top = "✦ THÉO PHAN ✦",
  bottom = "RENNES · FRANCE",
  glyph = "✈",
  label = "4INFO",
  ink = "#c8452b",
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-hidden="true"
      className={className}
      style={{ mixBlendMode: "multiply", opacity: 0.85 }}
    >
      <defs>
        <filter id="stamp-ink">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
        {/* upper arc, text reads left to right over the top */}
        <path id="stamp-top" fill="none" d="M 30 100 A 70 70 0 0 1 170 100" />
        {/* lower arc, text reads left to right along the bottom */}
        <path id="stamp-bottom" fill="none" d="M 32 100 A 68 68 0 0 0 168 100" />
      </defs>

      <g filter="url(#stamp-ink)" fill={ink} stroke={ink}>
        <circle cx="100" cy="100" r="90" fill="none" strokeWidth="3" />
        <circle cx="100" cy="100" r="78" fill="none" strokeWidth="1.5" />

        <text
          fontFamily="ui-monospace, monospace"
          fontSize="13"
          fontWeight="700"
          letterSpacing="2.4"
          stroke="none"
        >
          <textPath href="#stamp-top" startOffset="50%" textAnchor="middle">
            {top}
          </textPath>
        </text>
        <text
          fontFamily="ui-monospace, monospace"
          fontSize="12"
          fontWeight="700"
          letterSpacing="2.4"
          stroke="none"
        >
          <textPath href="#stamp-bottom" startOffset="50%" textAnchor="middle">
            {bottom}
          </textPath>
        </text>

        <line x1="52" y1="100" x2="148" y2="100" strokeWidth="1.5" />
        <text
          x="100"
          y="86"
          textAnchor="middle"
          fontSize="30"
          stroke="none"
        >
          {glyph}
        </text>
        <text
          x="100"
          y="128"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="15"
          fontWeight="700"
          letterSpacing="3"
          stroke="none"
        >
          {label}
        </text>
      </g>
    </svg>
  );
}

export default memo(Stamp);
