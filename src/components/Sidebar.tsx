import { Award, CheckSquare, Gauge, Goal, Timer, Flame } from 'lucide-react';
import { View } from '../types';

const items: { key: View; label: string; icon: JSX.Element }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <Gauge size={18} /> },
  { key: 'tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
  { key: 'habits', label: 'Habits', icon: <Flame size={18} /> },
  { key: 'goals', label: 'Goals', icon: <Goal size={18} /> },
  { key: 'focus', label: 'Focus', icon: <Timer size={18} /> },
  { key: 'achievements', label: 'Achievements', icon: <Award size={18} /> },
];

export const Sidebar = ({ view, setView }: { view: View; setView: (v: View) => void }) => (
  <aside className="flex w-full shrink-0 gap-2 overflow-x-auto rounded-2xl border border-slate-800 bg-panel p-2 md:min-h-screen md:w-60 md:flex-col md:gap-1 md:rounded-none md:border-r">
    <div className="hidden px-3 py-4 md:block">
      <h1 className="bg-primaryGradient bg-clip-text text-2xl font-bold text-transparent">ActiveAI</h1>
      <p className="text-xs text-slate-400">Level up your discipline.</p>
    </div>
    {items.map((item) => (
      <button key={item.key} onClick={() => setView(item.key)} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${view === item.key ? 'bg-primaryGradient text-white shadow-lg' : 'text-slate-300 hover:bg-panelSoft'}`}>
        {item.icon}
        <span>{item.label}</span>
      </button>
    ))}
  </aside>
);
