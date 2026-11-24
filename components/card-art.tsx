import type { BuildTheme } from "@/lib/builds";

const afterDarkDots = buildAfterDarkDots();

export function CardArt({ theme }: { theme: BuildTheme }) {
  if (theme === "outlaw") {
    return (
      <svg className="card-art" viewBox="0 0 600 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="430" fill="#f4a04a" />
        {outlawRays.map((points, index) => (
          <polygon key={index} points={points} fill={index % 2 === 0 ? "#ffe7b4" : "#ffd98a"} />
        ))}
      </svg>
    );
  }

  if (theme === "after-dark") {
    return (
      <svg className="card-art" viewBox="0 0 600 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="430" fill="#d4b0ff" />
        {afterDarkDots.map((dot) => (
          <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#8a5cf0" />
        ))}
      </svg>
    );
  }

  if (theme === "angry-flower") {
    return (
      <svg className="card-art" viewBox="0 0 600 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="430" fill="#49b6ff" />
        {angrySunRays.map((points, index) => (
          <polygon key={index} points={points} fill="#ffe56a" />
        ))}
        <circle cx="176" cy="268" r="78" fill="#ffe14d" />
        <circle cx="176" cy="268" r="34" fill="#f5b423" />
      </svg>
    );
  }

  return (
    <svg className="card-art" viewBox="0 0 600 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="430" fill="#d5f8cf" />
      {azaleaPetals.map((petal) => (
        <ellipse
          key={petal.angle}
          cx={petal.cx}
          cy={petal.cy}
          rx="62"
          ry="40"
          fill="#ff78b8"
          transform={`rotate(${petal.angle} ${petal.cx} ${petal.cy})`}
        />
      ))}
      <circle cx="214" cy="268" r="20" fill="#ffd0e6" />
      <circle cx="214" cy="268" r="8" fill="#ff8fbe" />
    </svg>
  );
}

const outlawRays = Array.from({ length: 18 }, (_, index) => {
  const originX = 78;
  const originY = 248;
  const start = -1.15 + index * 0.16;
  const spread = index % 3 === 0 ? 0.055 : 0.034;
  const length = 640;
  const x1 = originX + Math.cos(start) * length;
  const y1 = originY + Math.sin(start) * length;
  const x2 = originX + Math.cos(start + spread) * length;
  const y2 = originY + Math.sin(start + spread) * length;
  return `${originX},${originY} ${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
});

const angrySunRays = Array.from({ length: 18 }, (_, index) => {
  const originX = 176;
  const originY = 268;
  const start = index * ((Math.PI * 2) / 18);
  const spread = 0.11;
  const length = 168;
  const x1 = originX + Math.cos(start) * length;
  const y1 = originY + Math.sin(start) * length;
  const x2 = originX + Math.cos(start + spread) * length;
  const y2 = originY + Math.sin(start + spread) * length;
  return `${originX},${originY} ${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
});

const azaleaPetals = [0, 72, 144, 216, 288].map((angle) => {
  const radian = (angle * Math.PI) / 180;
  return {
    angle,
    cx: 214 + Math.cos(radian) * 52,
    cy: 268 + Math.sin(radian) * 52,
  };
});

function buildAfterDarkDots() {
  const dots: { cx: number; cy: number; r: number }[] = [];

  for (let row = 0; row < 16; row += 1) {
    for (let column = 0; column < 14; column += 1) {
      const cx = 24 + column * 28;
      const cy = 36 + row * 26;
      const distance = Math.hypot(cx - 36, cy - 400);
      const radius = 12.5 - distance / 28;
      if (radius > 1.5) {
        dots.push({ cx, cy, r: radius });
      }
    }
  }

  return dots;
}
