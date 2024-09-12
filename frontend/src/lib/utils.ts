import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  format,
  getDate,
  formatDistanceToNow,
  isYesterday,
  isTomorrow,
  isToday,
  addHours,
  isBefore,
  isAfter,
} from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCustomDate(date: Date) {
  const day = format(date, 'EEEE');
  const dateNum = getDate(date);
  const suffix = getOrdinalSuffix(dateNum);
  const monthAndYear = format(date, 'MMM. yyyy');

  return `${day} ${dateNum}${suffix}, ${monthAndYear}`;
}

function getOrdinalSuffix(n: number) {
  if (n > 3 && n < 21) return 'th';
  switch (n % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export const formatTemperature = (temp: number) => {
  return (temp - 273.15).toFixed(1);
};

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getTimeOfDayGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

/**
 * Formats a date into a user-friendly string.
 * @param date The date to format
 * @returns A string representation of the date in a user-friendly format
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const twoHoursAgo = addHours(now, -2);

  if (isBefore(date, twoHoursAgo) && isAfter(date, addHours(now, -24))) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isToday(date)) {
    return format(date, "'Today at' h:mm a");
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else {
    return format(date, 'MMMM d, yyyy');
  }
}
