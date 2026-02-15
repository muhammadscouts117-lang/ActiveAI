import { Bot, HeartHandshake, Lightbulb } from 'lucide-react';
import { Goal, Habit, Task, User } from '../types';
import { getCoachFeedback } from '../utils/coach';

export const AICoachPanel = ({ user, tasks, habits, goals }: { user: User; tasks: Task[]; habits: Habit[]; goals: Goal[] }) => {
  const feedback = getCoachFeedback(user, tasks, habits, goals);

  return (
    <section className="card animate-fadeUp space-y-3 border border-cyan-400/20 bg-gradient-to-br from-slate-900/90 to-indigo-900/50">
      <div className="flex items-center gap-2">
        <Bot size={18} className="text-cyan-300" />
        <h3 className="font-semibold">AI Coach Panel</h3>
      </div>
      <div className="rounded-xl bg-panelSoft/80 p-3">
        <p className="text-sm font-medium text-cyan-200">{feedback.headline}</p>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="rounded-xl bg-slate-900/60 p-3 text-sm">
          <p className="mb-1 flex items-center gap-1 text-xs uppercase tracking-wide text-emerald-300"><HeartHandshake size={14} /> Compliment</p>
          <p>{feedback.compliment}</p>
        </div>
        <div className="rounded-xl bg-slate-900/60 p-3 text-sm">
          <p className="mb-1 flex items-center gap-1 text-xs uppercase tracking-wide text-amber-300"><Lightbulb size={14} /> Suggestion</p>
          <p>{feedback.suggestion}</p>
        </div>
      </div>
    </section>
  );
};
