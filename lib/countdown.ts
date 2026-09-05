export type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

export function getTimeRemaining(
  target: Date,
  now: Date = new Date()
): TimeRemaining {
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isPast: false };
}

export function formatTwoDigits(n: number): string {
  return String(n).padStart(2, "0");
}
