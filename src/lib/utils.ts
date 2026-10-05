import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatOdds(odds: number, format: "decimal" | "fractional" = "decimal"): string {
  if (format === "decimal") return odds.toFixed(2);
  const numerator = Math.round((odds - 1) * 100);
  const denominator = 100;
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const d = gcd(numerator, denominator);
  return `${numerator / d}/${denominator / d}`;
}

export function impliedProbability(decimalOdds: number): number {
  return (1 / decimalOdds) * 100;
}

export function formatRecord(wins: number, losses: number, draws: number): string {
  return `${wins} - ${losses} - ${draws}`;
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
