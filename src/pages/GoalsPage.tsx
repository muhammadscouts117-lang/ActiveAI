import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GoalCategory } from '../types';

export const GoalsPage = () => {
  const { goals, addGoal, addMilestone, toggleMilestone, updateGoalProgress } = useApp();
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<GoalCategory>('discipline');

  return (
    <div className="space-y-4">
      <div className="card grid gap-2 md:grid-cols-4">
        <input className="input md:col-span-2" placeholder="Goal title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="input" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        <div className="flex gap-2"><select className="input" value={category} onChange={(e) => setCategory(e.target.value as GoalCategory)}><option value="health">Health</option><option value="learning">Learning</option><option value="discipline">Discipline</option></select><button className="btn-primary" onClick={() => { if (title) { addGoal(title, targetDate, category); setTitle(''); } }}>Add</button></div>
      </div>

      {goals.map((goal) => (
        <div key={goal.id} className="card space-y-2">
          <div className="flex items-center justify-between"><h3 className="font-semibold">{goal.title}</h3><span className="text-xs uppercase text-cyan-300">{goal.category}</span></div>
          <input type="range" min={0} max={100} value={goal.progress} onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))} className="w-full" />
          <p className="text-sm text-slate-300">Progress: {goal.progress}% · Target {goal.targetDate}</p>
          <div className="space-y-1">
            {goal.milestones.map((m) => (
              <label key={m.id} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={m.done} onChange={() => toggleMilestone(goal.id, m.id)} />{m.title}</label>
            ))}
          </div>
          <AddMilestone onAdd={(value) => addMilestone(goal.id, value)} />
        </div>
      ))}
    </div>
  );
};

const AddMilestone = ({ onAdd }: { onAdd: (text: string) => void }) => {
  const [value, setValue] = useState('');
  return (
    <div className="flex gap-2"><input className="input" placeholder="Add milestone" value={value} onChange={(e) => setValue(e.target.value)} /><button className="btn-secondary" onClick={() => { if (value) { onAdd(value); setValue(''); } }}>Add milestone</button></div>
  );
};
