import { useState } from 'react';
import { isAfter } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Priority, Task } from '../types';

export const TasksPage = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useApp();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [tab, setTab] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [editing, setEditing] = useState<string | null>(null);

  const filtered = tasks.filter((t) => {
    if (tab === 'completed') return t.completed;
    if (tab === 'upcoming') return !t.completed && isAfter(new Date(t.dueDate), new Date());
    return !t.completed;
  });

  const submit = () => {
    if (!title.trim()) return;
    addTask(title, priority, dueDate);
    setTitle('');
  };

  return (
    <div className="space-y-4">
      <div className="card grid gap-3 md:grid-cols-4">
        <input className="input md:col-span-2" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="input" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
        <div className="flex gap-2"><input type="date" className="input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><button className="btn-primary" onClick={submit}>Add</button></div>
      </div>

      <div className="flex gap-2">{(['today', 'upcoming', 'completed'] as const).map((t) => <button key={t} className={`btn-secondary ${tab === t ? 'bg-indigo-600' : ''}`} onClick={() => setTab(t)}>{t}</button>)}</div>

      <div className="space-y-2">
        {filtered.map((task) => (
          <TaskRow key={task.id} task={task} editing={editing === task.id} onEdit={() => setEditing(task.id)} onSave={(patch) => { updateTask(task.id, patch); setEditing(null); }} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
        ))}
      </div>
    </div>
  );
};

const TaskRow = ({ task, onToggle, onDelete, onSave, editing, onEdit }: { task: Task; onToggle: () => void; onDelete: () => void; onSave: (patch: Partial<Task>) => void; editing: boolean; onEdit: () => void }) => {
  const [draft, setDraft] = useState(task.title);
  return (
    <div className="card flex items-center gap-3">
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      {editing ? <input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} /> : <div className="flex-1"><p className="font-medium">{task.title}</p><p className="text-xs uppercase text-slate-400">{task.priority} · due {task.dueDate}</p></div>}
      {editing ? <button className="btn-primary" onClick={() => onSave({ title: draft })}>Save</button> : <button onClick={onEdit}><Pencil size={16} /></button>}
      <button onClick={onDelete}><Trash2 size={16} className="text-rose-400" /></button>
    </div>
  );
};
