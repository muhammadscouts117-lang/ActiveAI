import { useEffect, useState } from 'react';
import { MoonStar, Play, Pause, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

export const FocusPage = () => {
  const { addFocusSession, focusSessions } = useApp();
  const [seconds, setSeconds] = useState(FOCUS_SECONDS);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [deepMode, setDeepMode] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          addFocusSession(mode === 'focus' ? 25 : 5, mode);
          const nextMode = mode === 'focus' ? 'break' : 'focus';
          setMode(nextMode);
          setRunning(false);
          return nextMode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, mode, addFocusSession]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const sessions = focusSessions.filter((s) => s.mode === 'focus').length;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section className={`card lg:col-span-2 ${deepMode ? 'bg-slate-950' : ''}`}>
        <p className="mb-2 text-sm uppercase text-slate-400">{mode} mode</p>
        <div className="text-center text-7xl font-black tracking-widest">{mins}:{secs}</div>
        <div className="mt-4 flex justify-center gap-2">
          <button className="btn-primary" onClick={() => setRunning((r) => !r)}>{running ? <Pause size={16} /> : <Play size={16} />}</button>
          <button className="btn-secondary" onClick={() => { setRunning(false); setSeconds(mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS); }}><RotateCcw size={16} /></button>
          <button className={`btn-secondary ${deepMode ? 'bg-indigo-600' : ''}`} onClick={() => setDeepMode((d) => !d)}><MoonStar size={16} /> Deep focus</button>
        </div>
      </section>
      <section className="card">
        <h3 className="font-semibold">Session stats</h3>
        <p className="mt-2 text-sm text-slate-300">Total sessions: {sessions}</p>
        <p className="text-sm text-slate-300">Flow bonus: every 3 sessions</p>
        <p className="mt-2 text-xs text-slate-400">Complete 10 sessions for Focus Forge badge.</p>
      </section>
    </div>
  );
};
