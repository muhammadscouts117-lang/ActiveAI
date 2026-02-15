import { format } from 'date-fns';
import { Goal, Habit, Task, User } from '../types';

export const getCoachMessage = (user: User, tasks: Task[], habits: Habit[], goals: Goal[]): string => {
  const doneToday = tasks.filter((t) => t.completedAt?.startsWith(format(new Date(), 'yyyy-MM-dd'))).length;
  const highestStreak = Math.max(0, ...habits.map((h) => h.streak));
  const activeGoals = goals.filter((g) => !g.achieved).length;

  if (user.streak >= 7) return `🔥 ${user.streak}-day streak! Discipline compounds — protect it today.`;
  if (doneToday >= 3) return `⚡ Combo unlocked. ${doneToday} tasks completed today — push for one more.`;
  if (highestStreak >= 10) return `🏆 Habit legend! Your ${highestStreak}-day streak proves your identity is changing.`;
  if (activeGoals === 0) return '🎯 You completed all goals. Set a new challenge and keep the momentum.';

  const missedHabit = habits.find((h) => !h.history.includes(format(new Date(), 'yyyy-MM-dd')));
  if (missedHabit) return `💡 ${missedHabit.name} is waiting. A small win right now keeps your streak alive.`;

  return 'You are one focused action away from leveling up. Start a focus session and gain momentum.';
};
