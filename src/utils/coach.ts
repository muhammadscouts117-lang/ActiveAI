import { format } from 'date-fns';
import { Goal, Habit, Task, User } from '../types';

interface CoachFeedback {
  headline: string;
  compliment: string;
  suggestion: string;
}

const today = () => format(new Date(), 'yyyy-MM-dd');

export const getCoachMessage = (user: User, tasks: Task[], habits: Habit[], goals: Goal[]): string => {
  const doneToday = tasks.filter((t) => t.completedAt?.startsWith(today())).length;
  const highestStreak = Math.max(0, ...habits.map((h) => h.streak));
  const activeGoals = goals.filter((g) => !g.achieved).length;

  if (user.streak >= 7) return `🔥 ${user.streak}-day streak! Discipline compounds — protect it today.`;
  if (doneToday >= 3) return `⚡ Combo unlocked. ${doneToday} tasks completed today — push for one more.`;
  if (highestStreak >= 10) return `🏆 Habit legend! Your ${highestStreak}-day streak proves your identity is changing.`;
  if (activeGoals === 0) return '🎯 You completed all goals. Set a new challenge and keep the momentum.';

  const missedHabit = habits.find((h) => !h.history.includes(today()));
  if (missedHabit) return `💡 ${missedHabit.name} is waiting. A small win right now keeps your streak alive.`;

  return 'You are one focused action away from leveling up. Start a focus session and gain momentum.';
};

export const getCoachFeedback = (user: User, tasks: Task[], habits: Habit[], goals: Goal[]): CoachFeedback => {
  const pendingHighPriority = tasks.filter((task) => !task.completed && task.priority === 'high').length;
  const completedToday = tasks.filter((task) => task.completedAt?.startsWith(today())).length;
  const topHabitStreak = Math.max(0, ...habits.map((habit) => habit.streak));
  const stalledGoal = goals.find((goal) => !goal.achieved && goal.progress < 35);

  const compliment = topHabitStreak >= 5
    ? `Your ${topHabitStreak}-day streak is elite consistency.`
    : completedToday > 0
      ? `Strong execution — ${completedToday} task${completedToday > 1 ? 's' : ''} finished today.`
      : 'You showed up today. Momentum starts there.';

  if (pendingHighPriority > 0) {
    return {
      headline: 'Prioritize impact first',
      compliment,
      suggestion: `You have ${pendingHighPriority} high-priority task${pendingHighPriority > 1 ? 's' : ''}. Knock out one before checking anything else.`,
    };
  }

  if (stalledGoal) {
    return {
      headline: 'Move your biggest goal',
      compliment,
      suggestion: `"${stalledGoal.title}" is under 35%. Add a milestone and set a 25-minute focus block to advance it.`,
    };
  }

  return {
    headline: `Level ${user.level} energy`,
    compliment,
    suggestion: 'Keep your streak alive with one habit log and one focused work sprint in the next hour.',
  };
};
