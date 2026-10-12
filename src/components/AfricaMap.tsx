import { useId } from "react";
import styles from "./AfricaMap.module.css";
import { AFRICA_PATH } from "./africa-path";

// Décalage de la carte dans le viewBox (laisse la place aux étiquettes à gauche)
const SX = 170;
const SY = 6;

type Country = { name: string; x: number; y: number };

// Pays de la CEDEAO (12 membres). Coordonnées dans le repère de la carte.
const ATLANTIC: Country[] = [
  { name: "Sénégal", x: 26, y: 184 },
  { name: "Gambie", x: 21, y: 192 },
  { name: "Guinée-Bissau", x: 24, y: 204 },
  { name: "Guinée", x: 56, y: 214 },
  { name: "Sierra Leone", x: 50, y: 232 },
  { name: "Libéria", x: 70, y: 249 },
];

const GULF: Country[] = [
  { name: "Côte d'Ivoire", x: 102, y: 249 },
  { name: "Ghana", x: 131, y: 245 },
  { name: "Togo", x: 153, y: 240 },
  { name: "Bénin", x: 162, y: 226 },
  { name: "Nigéria", x: 204, y: 232 },
];

const ATLANTIC_FIRST_ROW = 206;
const ATLANTIC_ROW_GAP = 24;
const GULF_ROWS = [292, 316, 340, 364, 388];

const LEGEND: Country[] = [{ name: "Cabo Verde", x: 0, y: 0 }, ...ATLANTIC, ...GULF];

type Props = {
  className?: string;
  /** Texte alternatif lu par les lecteurs d'écran */
  title?: string;
};

export default function AfricaMap({
  className,
  title = "Carte de l'Afrique avec Madagascar. Les pays de la CEDEAO sont étiquetés. Des lignes partent du Bénin vers le reste du continent : digitalisation, intelligence artificielle, économie.",
}: Props) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.desktop}>
        <MapSvg uid={`${uid}-d`} title={title} variant="desktop" />
      </div>
      <div className={styles.mobile}>
        <MapSvg uid={`${uid}-m`} title={title} variant="mobile" />
        <ul className={styles.legend} aria-label="Pays de la CEDEAO">
          {LEGEND.map((c) => (
            <li key={c.name} className={c.name === "Bénin" ? styles.chipBenin : styles.chip}>
              <span className={styles.dot} aria-hidden="true" />
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MapSvg({
  uid,
  title,
  variant,
}: {
  uid: string;
  title: string;
  variant: "desktop" | "mobile";
}) {
  const id = (name: string) => `${name}-${uid}`;
  const ref = (name: string) => `url(#${id(name)})`;
  const mobile = variant === "mobile";

  return (
    <svg
      className={mobile ? styles.svgMobile : styles.svg}
      viewBox={mobile ? "150 0 620 610" : "0 0 740 600"}
      role="img"
      aria-label={title}
    >
      <defs>
        <filter id={id("ink")} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves={3} seed={3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={4} />
        </filter>
        <linearGradient id={id("land")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1b1b" />
          <stop offset="1" stopColor="#080808" />
        </linearGradient>
      </defs>

      <g transform={`translate(${SX},${SY})`}>
        <path d={AFRICA_PATH} fill={ref("land")} filter={ref("ink")} />

        <path className={styles.arc} d="M162 226Q230 90 394 60" />
        <path className={styles.arc} d="M162 226Q400 180 518 452" />
        <path className={styles.arc} d="M162 226Q330 330 368 508" />
        <g fill="var(--map-orange)">
          <circle cx={394} cy={60} r={mobile ? 8 : 5} />
          <circle cx={518} cy={452} r={mobile ? 9 : 6} />
          <circle cx={368} cy={508} r={mobile ? 8 : 5} />
        </g>

        {mobile ? (
          <>
            <Tag x={168} y={88} w={200} h={34} label="Digitalisation" />
            <Tag x={248} y={228} w={292} h={34} label="Intelligence artificielle" />
            <Tag x={228} y={322} w={140} h={34} label="Économie" />
          </>
        ) : (
          <>
            <Tag x={194} y={104} w={120} h={24} label="Digitalisation" />
            <Tag x={293} y={248} w={154} h={24} label="Intelligence artificielle" />
            <Tag x={255} y={336} w={88} h={24} label="Économie" />
          </>
        )}

        <g className={styles.label}>
          <line x1={518} y1={460} x2={518} y2={mobile ? 528 : 520} />
          <text
            x={mobile ? 545 : 518}
            y={mobile ? 552 : 536}
            textAnchor={mobile ? "end" : "middle"}
            fontSize={mobile ? 20 : undefined}
          >
            Madagascar
          </text>
        </g>
      </g>

      {mobile ? null : (
        <>
          <g className={styles.label}>
            <g fill="#141414">
              <circle cx={128} cy={181} r={3.2} />
              <circle cx={122} cy={186} r={3} />
              <circle cx={131} cy={190} r={2.6} />
            </g>
            <line x1={126} y1={176} x2={126} y2={158} />
            <text x={126} y={152} textAnchor="middle">Cabo Verde</text>
          </g>

          {ATLANTIC.map((c, i) => {
            const ly = ATLANTIC_FIRST_ROW + i * ATLANTIC_ROW_GAP;
            const px = c.x + SX;
            const py = c.y + SY;
            return (
              <g key={c.name} className={styles.label}>
                <line x1={118} y1={ly - 4} x2={px} y2={py} />
                <circle cx={px} cy={py} r={3.5} />
                <text x={112} y={ly} textAnchor="end">{c.name}</text>
              </g>
            );
          })}

          {GULF.map((c, i) => {
            const row = GULF_ROWS[i];
            const px = c.x + SX;
            const py = c.y + SY;
            const isBenin = c.name === "Bénin";
            return (
              <g key={c.name} className={`${styles.label} ${isBenin ? styles.benin : ""}`}>
                <line x1={px} y1={py} x2={px} y2={row} />
                <circle cx={px} cy={py} r={3.5} />
                <text x={px - 6} y={row + 4} textAnchor="end">{c.name}</text>
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}

function Tag({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  const mid = h / 2;
  const notch = h <= 24 ? 7 : 10;
  const fontSize = h <= 24 ? undefined : 18;
  return (
    <g className={styles.tag} transform={`translate(${x},${y})`}>
      <polygon points={`0,0 ${w},0 ${w - notch},${mid} ${w},${h} 0,${h} ${notch},${mid}`} />
      <text x={w / 2} y={h * 0.72} fontSize={fontSize}>{label}</text>
    </g>
  );
}
