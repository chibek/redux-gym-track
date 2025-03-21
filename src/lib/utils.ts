import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateInvoiceNumber = (timestamp: string) => {
  const date = parseISO(timestamp);
  const year = format(date, "yyyy");
  const monthDay = format(date, "MMdd"); // MMDD
  const time = format(date, "HHmm"); // HHMM

  return `#F-${year}-${monthDay}-${time}`;
};
