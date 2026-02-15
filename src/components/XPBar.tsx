import { xpProgress } from '../utils/xp';

export const XPBar = ({ xp }: { xp: number }) => {
  const { current, max, percent } = xpProgress(xp);
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>XP</span>
        <span>{current}/{max}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,.7)] transition-all duration-700" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
