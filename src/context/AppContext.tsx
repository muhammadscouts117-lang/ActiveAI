import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { defaultFocus, defaultGoals, defaultHabits, defaultTasks, defaultUser } from '../data/exampleData';
import { getLocal, setLocal } from '../utils/storage';
import { levelFromXp } from '../utils/xp';
import { Achievement, FocusSession, Goal, Habit, Milestone, Priority, Task, User } from '../types';

interface AppState {
  user: User;
  tasks: Task[];
  habits: Habit[];
  goals: Goal[];
  focusSessions: FocusSession[];
  aiMessage: string;
  levelUp: number | null;
  unlockedBadge: Achievement | null;
  xpGain: number;
  addTask: (title: string, priority: Priority, dueDate: string) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  addHabit: (name: string, frequency: Habit['frequency']) => void;
  logHabit: (id: string) => void;
  addGoal: (title: string, targetDate: string, category: Goal['category']) => void;
  addMilestone: (goalId: string, title: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  addFocusSession: (duration: number, mode?: FocusSession['mode']) => void;
  clearAlerts: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const KEY = 'activeai-state-v1';
const today = () => format(new Date(), 'yyyy-MM-dd');

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const persisted = getLocal(KEY, {
    user: defaultUser,
    tasks: defaultTasks,
    habits: defaultHabits,
    goals: defaultGoals,
    focusSessions: defaultFocus,
  });

  const [user, setUser] = useState<User>(persisted.user);
  const [tasks, setTasks] = useState<Task[]>(persisted.tasks);
  const [habits, setHabits] = useState<Habit[]>(persisted.habits);
  const [goals, setGoals] = useState<Goal[]>(persisted.goals);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>(persisted.focusSessions);
  const [levelUp, setLevelUp] = useState<number | null>(null);
  const [unlockedBadge, setUnlockedBadge] = useState<Achievement | null>(null);
  const [xpGain, setXpGain] = useState(0);
  const [aiMessage] = useState('');

  useEffect(() => {
    setLocal(KEY, { user, tasks, habits, goals, focusSessions });
  }, [user, tasks, habits, goals, focusSessions]);

  const grantXp = (amount: number, reason?: Achievement) => {
    setXpGain(amount);
    setTimeout(() => setXpGain(0), 1300);

    setUser((prev) => {
      const newXp = prev.xp + amount;
      const { level, xpToNext } = levelFromXp(newXp);
      if (level > prev.level) setLevelUp(level);
      const next = { ...prev, xp: newXp, level, xpToNext };
      if (reason && !prev.achievements.some((a) => a.id === reason.id)) {
        const unlock = { ...reason, unlockedAt: new Date().toISOString() };
        next.achievements = [...next.achievements, unlock];
        setUnlockedBadge(unlock);
      }
      return next;
    });
  };

  const addTask = (title: string, priority: Priority, dueDate: string) => {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, priority, dueDate, completed: false, createdAt: new Date().toISOString() }]);
  };

  const updateTask = (id: string, patch: Partial<Task>) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleTask = (id: string) => {
    const todaysDone = tasks.filter((t) => t.completedAt?.startsWith(today())).length;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const completing = !t.completed;
        if (completing) {
          const comboBonus = todaysDone >= 2 ? 20 : 0;
          grantXp(40 + comboBonus, todaysDone === 2 ? { id: 'combo3', title: 'Combo x3', description: 'Completed 3 tasks in a day' } : undefined);
        }
        return { ...t, completed: completing, completedAt: completing ? new Date().toISOString() : undefined };
      }),
    );

    const totalDone = tasks.filter((t) => t.completed).length + 1;
    if (totalDone >= 30) grantXp(100, { id: 'task30', title: 'Task Tactician', description: 'Completed 30 tasks' });
  };

  const addHabit = (name: string, frequency: Habit['frequency']) => setHabits((prev) => [...prev, { id: crypto.randomUUID(), name, frequency, streak: 0, freezeCount: 1, history: [] }]);

  const logHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id || h.history.includes(today())) return h;
        const streak = h.streak + 1;
        const xp = 15 + Math.min(60, streak * 3);
        grantXp(xp, streak === 7 ? { id: 'streak7', title: '7-Day Streak', description: 'Held a habit streak for 7 days' } : undefined);
        if (streak % 14 === 0) grantXp(90);
        return { ...h, streak, history: [...h.history, today()] };
      }),
    );
    setUser((prev) => ({ ...prev, streak: prev.streak + 1 }));
  };

  const addGoal = (title: string, targetDate: string, category: Goal['category']) => {
    setGoals((prev) => [...prev, { id: crypto.randomUUID(), title, targetDate, progress: 0, milestones: [], linkedHabitIds: [], linkedTaskIds: [], category, achieved: false }]);
  };

  const addMilestone = (goalId: string, title: string) => {
    setGoals((prev) => prev.map((g) => (g.id === goalId ? { ...g, milestones: [...g.milestones, { id: crypto.randomUUID(), title, done: false }] } : g)));
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const milestones = g.milestones.map((m: Milestone) => (m.id === milestoneId ? { ...m, done: !m.done } : m));
        const newlyDone = milestones.find((m) => m.id === milestoneId)?.done;
        if (newlyDone) grantXp(60, { id: `mile-${milestoneId}`, title: 'Milestone Crushed', description: 'Completed a goal milestone' });
        return { ...g, milestones };
      }),
    );
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const achieved = progress >= 100;
        if (achieved && !g.achieved) grantXp(150, { id: 'goal5', title: 'Goal Getter', description: 'Achieved 5 goals' });
        return { ...g, progress, achieved };
      }),
    );
  };

  const addFocusSession = (duration: number, mode: FocusSession['mode'] = 'focus') => {
    const session = { id: crypto.randomUUID(), date: new Date().toISOString(), duration, mode };
    setFocusSessions((prev) => [...prev, session]);

    const focusToday = focusSessions.filter((s) => s.mode === 'focus' && s.date.startsWith(today())).length + 1;
    const flowBonus = focusToday % 3 === 0 ? 35 : 0;
    grantXp(25 + flowBonus, focusToday === 10 ? { id: 'focus10', title: 'Focus Forge', description: 'Completed 10 focus sessions' } : undefined);
  };

  const clearAlerts = () => {
    setLevelUp(null);
    setUnlockedBadge(null);
  };

  const value = useMemo(
    () => ({ user, tasks, habits, goals, focusSessions, aiMessage, levelUp, unlockedBadge, xpGain, addTask, updateTask, deleteTask, toggleTask, addHabit, logHabit, addGoal, addMilestone, toggleMilestone, updateGoalProgress, addFocusSession, clearAlerts }),
    [user, tasks, habits, goals, focusSessions, aiMessage, levelUp, unlockedBadge, xpGain],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppState => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
