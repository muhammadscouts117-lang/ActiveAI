import { formatISO } from 'date-fns';
import { FocusSession, Goal, Habit, Task, User } from '../types';

const today = new Date();

export const defaultUser: User = {
  level: 3,
  xp: 570,
  xpToNext: 360,
  streak: 4,
  achievements: [],
};

export const defaultTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: 'Morning planning sprint',
    priority: 'high',
    dueDate: formatISO(today, { representation: 'date' }),
    completed: false,
    createdAt: today.toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Review learning notes',
    priority: 'medium',
    dueDate: formatISO(new Date(today.getTime() + 86400000), { representation: 'date' }),
    completed: false,
    createdAt: today.toISOString(),
  },
];

export const defaultHabits: Habit[] = [
  {
    id: crypto.randomUUID(),
    name: 'Exercise 30 minutes',
    frequency: 'daily',
    streak: 6,
    freezeCount: 1,
    history: [formatISO(today, { representation: 'date' })],
  },
];

export const defaultGoals: Goal[] = [
  {
    id: crypto.randomUUID(),
    title: 'Build consistency in deep work',
    targetDate: formatISO(new Date(today.getTime() + 12096e5), { representation: 'date' }),
    progress: 42,
    milestones: [
      { id: crypto.randomUUID(), title: '10 focus sessions', done: true },
      { id: crypto.randomUUID(), title: '7 day streak', done: false },
    ],
    linkedTaskIds: [],
    linkedHabitIds: [],
    category: 'discipline',
    achieved: false,
  },
];

export const defaultFocus: FocusSession[] = [];
