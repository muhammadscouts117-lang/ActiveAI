export const ProgressRing = ({ value, label, color = '#22d3ee' }: { value: number; label: string; color?: string }) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="h-24 w-24 -rotate-90">
        <circle cx="48" cy="48" r={radius} stroke="#1f2937" strokeWidth="10" fill="transparent" />
        <circle cx="48" cy="48" r={radius} stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dash} fill="transparent" />
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-bold">{value}%</div>
        <div className="text-[10px] text-slate-400">{label}</div>
      </div>
    </div>
  );
};
