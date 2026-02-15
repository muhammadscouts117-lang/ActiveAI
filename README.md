# ActiveAI

ActiveAI is a production-ready React + TypeScript + Tailwind app that turns productivity and growth into a gamified leveling system.

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- LocalStorage persistence
- React Context state management

## Features
- **Dashboard**: today tasks, streaks, active goals, XP progress, focus time, AI coach message, quick actions.
- **Tasks**: create/edit/delete, priorities, due dates, complete flow, today/upcoming/completed tabs, combo XP.
- **Habits**: daily/weekly habits, streak tracking, heatmap history, streak freeze count.
- **Goals**: target date, progress %, milestones, categories.
- **Focus**: Pomodoro timer (25/5), deep focus mode, flow bonus and session tracking.
- **Gamification**: XP engine, levels, streaks, badges, confetti burst, XP gain toast, level-up and unlock modals.
- **AI Coach**: rule-based motivational and discipline-focused coaching messages.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Project Structure
```
src/
  components/
  pages/
  context/
  hooks/
  utils/
  data/
```

All app data persists in LocalStorage using key `activeai-state-v1`.
