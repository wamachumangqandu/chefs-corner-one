export const courseOptions = ["Starter", "Main Course", "Dessert"] as const;

export type Course = (typeof courseOptions)[number];

export function getCourse(value: string): Course | null {
  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue === "main" || normalizedValue === "main course") {
    return "Main Course";
  }

  return courseOptions.find(
    (course) => course.toLowerCase() === normalizedValue,
  ) ?? null;
}

export function parsePrice(value: string): number | null {
  const normalizedValue = value.trim().replace(/^R\s*/i, "").replace(/,/g, "");

  if (!/^\d+(?:\.\d{1,2})?$/.test(normalizedValue)) {
    return null;
  }

  const amount = Number(normalizedValue);
  return Number.isFinite(amount) ? amount : null;
}

export function formatPrice(amount: number): string {
  return `R ${amount.toFixed(2)}`;
}
