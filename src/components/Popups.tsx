import { PartyPopper, Trophy } from 'lucide-react';
import { Achievement } from '../types';

export const LevelUpModal = ({ level, onClose }: { level: number | null; onClose: () => void }) => {
  if (!level) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="animate-pop rounded-2xl border border-cyan-400 bg-panel p-6 text-center shadow-glow" onClick={(e) => e.stopPropagation()}>
        <PartyPopper className="mx-auto mb-2 text-cyan-300" />
        <h2 className="text-2xl font-bold">Level Up!</h2>
        <p>You reached Level {level}. Keep stacking wins.</p>
      </div>
    </div>
  );
};

export const BadgeModal = ({ badge, onClose }: { badge: Achievement | null; onClose: () => void }) => {
  if (!badge) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="animate-pop rounded-2xl border border-emerald-400 bg-panel p-6 text-center shadow-glow" onClick={(e) => e.stopPropagation()}>
        <Trophy className="mx-auto mb-2 text-emerald-300" />
        <h2 className="text-xl font-bold">Badge Unlocked</h2>
        <p className="font-semibold">{badge.title}</p>
        <p className="text-sm text-slate-300">{badge.description}</p>
      </div>
    </div>
  );
};

export const XPGainToast = ({ amount }: { amount: number }) =>
  amount > 0 ? <div className="fixed bottom-5 right-5 z-40 animate-fadeUp rounded-xl bg-cyan-500/20 px-4 py-2 text-cyan-200">+{amount} XP</div> : null;

export const ConfettiBurst = ({ trigger }: { trigger: boolean }) =>
  trigger ? (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="absolute top-0 h-2 w-2 animate-float rounded-full" style={{ left: `${(i * 37) % 100}%`, background: i % 2 ? '#22d3ee' : '#22c55e', animationDelay: `${(i % 10) * 0.08}s` }} />
      ))}
    </div>
  ) : null;
