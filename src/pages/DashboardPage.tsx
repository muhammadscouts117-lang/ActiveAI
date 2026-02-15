import { Clock3, Sparkles, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCoachMessage } from '../utils/coach';
import { ProgressRing } from '../components/ProgressRing';
import { XPBar } from '../components/XPBar';
import { AICoachPanel } from '../components/AICoachPanel';

export const DashboardPage = ({ onFocus }: { onFocus: () => void }) => {
  const { tasks, habits, goals, user, focusSessions, logHabit } = useApp();
  const todayTasks = tasks.filter((t) => !t.completed).slice(0, 5);
  const focusMinutes = focusSessions.filter((s) => s.mode === 'focus' && s.date.startsWith(new Date().toISOString().slice(0, 10))).reduce((sum, s) => sum + s.duration, 0);
  const msg = getCoachMessage(user, tasks, habits, goals);

  return (
    <div className="space-y-4">
      <section className="card bg-gradient-to-br from-indigo-700/40 to-cyan-600/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, challenger</h2>
            <p className="mt-1 flex items-center gap-2 text-slate-200"><Sparkles size={16} className="text-cyan-300" />{msg}</p>
          </div>
          <button className="btn-primary" onClick={onFocus}>Start Focus</button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <ProgressRing value={Math.min(100, user.streak * 10)} label="Streak" color="#22c55e" />
          <ProgressRing value={Math.min(100, Math.round(focusMinutes / 2))} label="Focus" color="#22d3ee" />
          <ProgressRing value={Math.min(100, goals.length ? Math.round(goals.reduce((a, b) => a + b.progress, 0) / goals.length) : 0)} label="Goals" color="#a78bfa" />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card lg:col-span-2">
          <div className="mb-2 flex items-center justify-between"><h3 className="font-semibold">Today's Tasks</h3><span className="text-xs text-slate-400">{todayTasks.length} pending</span></div>
          <div className="space-y-2">
            {todayTasks.map((task) => <div key={task.id} className="rounded-xl bg-panelSoft p-3 text-sm">{task.title}</div>)}
            {!todayTasks.length && <p className="text-sm text-slate-400">All done today. Add a stretch challenge.</p>}
          </div>
        </section>

        <section className="card space-y-3">
          <div className="flex items-center justify-between"><h3 className="font-semibold">Level {user.level}</h3><Zap className="text-cyan-300" size={16} /></div>
          <XPBar xp={user.xp} />
          <div className="rounded-xl bg-panelSoft p-3">
            <div className="mb-2 flex items-center gap-1 text-xs text-slate-400"><Clock3 size={14} /> Focus time today</div>
            <p className="text-xl font-bold">{focusMinutes} min</p>
          </div>
          <button className="btn-secondary w-full" onClick={() => habits[0] && logHabit(habits[0].id)}>Quick Log Habit</button>
        </section>
      </div>

      <AICoachPanel user={user} tasks={tasks} habits={habits} goals={goals} />
    </div>
  );
};
