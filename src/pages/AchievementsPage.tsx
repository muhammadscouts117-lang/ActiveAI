import { useApp } from '../context/AppContext';

const catalog = [
  { id: 'streak7', title: '7-day streak', description: 'Hold any habit for 7 days.' },
  { id: 'task30', title: '30 tasks complete', description: 'Complete 30 tasks total.' },
  { id: 'focus10', title: '10 focus sessions', description: 'Finish 10 focus sessions.' },
  { id: 'goal5', title: '5 goals achieved', description: 'Achieve five goals.' },
];

export const AchievementsPage = () => {
  const { user } = useApp();

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {catalog.map((a) => {
        const unlocked = user.achievements.find((u) => u.id === a.id);
        return (
          <div key={a.id} className={`card ${unlocked ? 'border-emerald-400/70' : 'opacity-70'}`}>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-slate-300">{a.description}</p>
            <p className="mt-2 text-xs">{unlocked ? `Unlocked ${new Date(unlocked.unlockedAt ?? '').toLocaleDateString()}` : 'Locked'}</p>
          </div>
        );
      })}
    </div>
  );
};
