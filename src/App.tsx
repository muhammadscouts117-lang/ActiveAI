import { useMemo, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { BadgeModal, ConfettiBurst, LevelUpModal, XPGainToast } from './components/Popups';
import { View } from './types';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { HabitsPage } from './pages/HabitsPage';
import { GoalsPage } from './pages/GoalsPage';
import { FocusPage } from './pages/FocusPage';
import { AchievementsPage } from './pages/AchievementsPage';

const Shell = () => {
  const [view, setView] = useState<View>('dashboard');
  const { levelUp, unlockedBadge, clearAlerts, xpGain } = useApp();

  const content = useMemo(() => {
    switch (view) {
      case 'tasks': return <TasksPage />;
      case 'habits': return <HabitsPage />;
      case 'goals': return <GoalsPage />;
      case 'focus': return <FocusPage />;
      case 'achievements': return <AchievementsPage />;
      default: return <DashboardPage onFocus={() => setView('focus')} />;
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-bg md:flex">
      <Sidebar view={view} setView={setView} />
      <main className="mx-auto w-full max-w-7xl p-4 md:p-6">{content}</main>
      <LevelUpModal level={levelUp} onClose={clearAlerts} />
      <BadgeModal badge={unlockedBadge} onClose={clearAlerts} />
      <ConfettiBurst trigger={Boolean(unlockedBadge)} />
      <XPGainToast amount={xpGain} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
