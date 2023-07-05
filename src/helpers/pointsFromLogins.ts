import { loginBrackets } from "../data/loginBrackets";

export const pointsFromLogins = (loginCount: number) => {
  let loginPoints = 0;
  loginBrackets.forEach((bracketLastDay, index) => {
    if (loginCount === 0) return 0;
    const pointValue = index + 1;

    // for first bracket, either we add 21,
    // or the logincount is less than 21 and we add that and stop
    if (pointValue === 1) {
      loginPoints += Math.min(loginCount, bracketLastDay);

      // if the logincount is greater than the previous last day,
      // add points for each day since the last bracket ended.
    } else if (
      loginCount > loginBrackets[index - 1]
    ) {
      loginPoints +=
        (Math.min(loginCount, bracketLastDay) - loginBrackets[index - 1]) *
        pointValue;
    }
  });

  return loginPoints;
};
