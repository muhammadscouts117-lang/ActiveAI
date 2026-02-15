export const levelFromXp = (xp: number): { level: number; xpToNext: number } => {
  let level = 1;
  let threshold = 200;
  let current = xp;

  while (current >= threshold) {
    current -= threshold;
    level += 1;
    threshold = 200 + (level - 1) * 80;
  }

  return { level, xpToNext: threshold };
};

export const xpProgress = (xp: number): { current: number; max: number; percent: number } => {
  let level = 1;
  let threshold = 200;
  let remaining = xp;

  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = 200 + (level - 1) * 80;
  }

  return {
    current: remaining,
    max: threshold,
    percent: Math.round((remaining / threshold) * 100),
  };
};
