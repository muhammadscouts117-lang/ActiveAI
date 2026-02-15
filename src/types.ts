export type Priority = 'low' | 'medium' | 'high';
export type HabitFrequency = 'daily' | 'weekly';
export type GoalCategory = 'health' | 'learning' | 'discipline';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
}

export interface User {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  achievements: Achievement[];
}

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: HabitFrequency;
  streak: number;
  freezeCount: number;
  history: string[];
}

export interface Milestone {
  id: string;
  title: string;
  done: boolean;
}

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  milestones: Milestone[];
  linkedTaskIds: string[];
  linkedHabitIds: string[];
  category: GoalCategory;
  achieved: boolean;
}

export interface FocusSession {
  id: string;
  date: string;
  duration: number;
  mode: 'focus' | 'break';
}

export type View = 'dashboard' | 'tasks' | 'habits' | 'goals' | 'focus' | 'achievements';
