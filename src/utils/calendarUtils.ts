import { LinearDay } from "../types";

export const YEAR = 2026;

export const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function buildYearDays(year: number): LinearDay[] {
  const days: LinearDay[] = [];
  let weekOfYear = 1;

  for (let month = 0; month < 12; month++) {
    const daysInMonth = getDaysInMonth(year, month);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const weekday = date.getDay();

      if (days.length > 0 && weekday === 0) weekOfYear++;

      const id = date.toISOString().slice(0, 10);

      days.push({
        id,
        date,
        year,
        monthIndex: month,
        dayOfMonth: day,
        weekday,
        weekOfYear
      });
    }
  }

  return days;
}

