import { expect, test } from 'vitest'
import { pointsForDay, loginsToLevel } from "./loginsToLevel";

/**
 * pointsForDay
 */
test('points for day 1', () => {
    expect(pointsForDay(0)).toBe(1);
});

test('points for day 21', () => {
    expect(pointsForDay(21)).toBe(1);
});

test('points for day 22', () => {
    expect(pointsForDay(22)).toBe(2);
});

test('points for day 91', () => {
    expect(pointsForDay(91)).toBe(5);
});

test('points for day 92', () => {
    expect(pointsForDay(92)).toBe(0);
});

/**
 * loginsToLevel
 */
test('first day of bp', () => {
    const bpLevel = 0;
    const totalPoints = 0;
    const loginCount = 0;
    const output = loginsToLevel(bpLevel, totalPoints, loginCount, 0);
    expect(output).toBe(0);
});

test('first day, level 2.1', () => {
    const bpLevel = 0;
    const totalPoints = 0;
    const loginCount = 0;
    const output = loginsToLevel(bpLevel, totalPoints, loginCount, 2.1);
    expect(output).toBe(21);
});

test('first day, level 50, only logins', () => {
    const bpLevel = 0;
    const totalPoints = 0;
    const loginCount = 0;
    const output = loginsToLevel(bpLevel, totalPoints, loginCount, 50);
    expect(output).toBe(-1);
});