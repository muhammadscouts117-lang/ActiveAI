import { useState } from 'react';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { useApp } from '../context/AppContext';
import { HabitFrequency } from '../types';

export const HabitsPage = () => {
  const { habits, addHabit, logHabit } = useApp();
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');

  return (
    <div className="space-y-4">
      <div className="card flex flex-wrap gap-2">
        <input className="input flex-1" placeholder="New habit" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="input w-36" value={frequency} onChange={(e) => setFrequency(e.target.value as HabitFrequency)}><option value="daily">Daily</option><option value="weekly">Weekly</option></select>
        <button className="btn-primary" onClick={() => { if (name) { addHabit(name, frequency); setName(''); } }}>Add Habit</button>
      </div>

      {habits.map((habit) => (
        <div key={habit.id} className="card">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{habit.name}</h3>
              <p className="text-xs text-slate-400">{habit.frequency} · streak {habit.streak} · freeze {habit.freezeCount}</p>
            </div>
            <button className="btn-secondary animate-pulseGlow" onClick={() => logHabit(habit.id)}>Log</button>
          </div>
          <Heatmap history={habit.history} />
        </div>
      ))}
    </div>
  );
};

const Heatmap = ({ history }: { history: string[] }) => {
  const days = eachDayOfInterval({ start: subDays(new Date(), 27), end: new Date() });
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((d) => {
        const key = format(d, 'yyyy-MM-dd');
        const done = history.includes(key);
        return <div key={key} className={`h-5 rounded ${done ? 'bg-emerald-400/70' : 'bg-slate-800'}`} title={key} />;
      })}
    </div>
  );
};
