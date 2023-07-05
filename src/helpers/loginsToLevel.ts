import { loginBrackets } from "../data/loginBrackets";

export const pointsForDay = (day: number) =>
  loginBrackets.findIndex((bracket) => day <= bracket) + 1;

export const loginsToLevel = (
  bpLevel: number,
  totalPoints: number,
  loginCount: number,
  level?: number,
  daysRemaining = 91,
) => {
  let difference = -1;
  if (level || level === 0) {
    if (level <= bpLevel) return 0;

    difference = Math.max(level * 10 - totalPoints, 0);
  }

  let loginDaysNeeded = 0;
  let loginPointsGained = 0;
  const maxDays = Math.min(loginBrackets[loginBrackets.length - 1], loginCount + daysRemaining);
  for (let i = loginCount; i < maxDays; i++) {
    if (difference === -1 || loginPointsGained < difference) {
      loginDaysNeeded++;
      loginPointsGained += pointsForDay(i) ?? 0;
    }
  }

  if (daysRemaining && loginDaysNeeded > daysRemaining) return -1;
  return loginPointsGained >= difference ? loginDaysNeeded : -1;
};

export const loginsToLevelReadable = (
  output: number,
  bpLevel?: number,
) => {
  if (output === 0) return "Goal Met";
  if (output === -1) return "Not Possible";
  return bpLevel ? output + bpLevel : output;
};
