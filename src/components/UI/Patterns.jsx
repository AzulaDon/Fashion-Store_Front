const Patterns = {
  circles: (accent) => (
    <svg viewBox="0 0 300 230" fill="none">
      {[120, 80, 40].map(r => (
        <circle key={r} cx="150" cy="115" r={r} stroke={accent} strokeWidth="0.5" opacity="0.25" />
      ))}
      <circle cx="240" cy="40" r="40" stroke={accent} strokeWidth="0.5" opacity="0.15" />
    </svg>
  ),

  lines: (accent) => (
    <svg viewBox="0 0 300 230" fill="none">
      {[0,1,2,3,4,5].map(i => (
        <line key={i} x1={i*60-10} y1="0" x2={i*60+220} y2="230" stroke={accent} strokeWidth="0.5" opacity="0.18" />
      ))}
      <rect x="40" y="30" width="220" height="170" stroke={accent} strokeWidth="0.5" opacity="0.18" />
    </svg>
  ),

  dots: (accent) => (
    <svg viewBox="0 0 300 230" fill="none">
      {[...Array(8)].map((_,r) =>
        [...Array(9)].map((_,c) => (
          <circle key={`${r}-${c}`} cx={18+c*34} cy={16+r*28} r="1.5" fill={accent} opacity="0.22" />
        ))
      )}
    </svg>
  ),
};

export default Patterns;