import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays, format, isPast } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fbTimeObjectToDateObject(fbTimeObject) {
  if (!fbTimeObject) {
    return 'N/A';
  }
  if (isNaN(fbTimeObject.seconds) || isNaN(fbTimeObject.nanoseconds)) {
    return 'N/A';
  }
  return new Date(fbTimeObject.seconds * 1000 + fbTimeObject.nanoseconds / 1000000);
}

export function displayTime(time: Date) {
  const result = differenceInDays(time, new Date());
  if (result === 0) {
    return `Today`;
  } else if (result < 0) {
    return `${Math.abs(result)} days ago`;
  }
  return `In ${result} days`;
}
