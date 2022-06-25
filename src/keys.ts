import { keyVariant } from "./enums/keyVariant";

interface iKeys {
  value: string | number;
  variant: keyVariant;
  colSpan?: boolean;
}

export const keys: iKeys[] = [
  { value: 7, variant: keyVariant.primary },
  { value: 8, variant: keyVariant.primary },
  { value: 9, variant: keyVariant.primary },
  { value: "DEL", variant: keyVariant.secondary },
  { value: 4, variant: keyVariant.primary },
  { value: 5, variant: keyVariant.primary },
  { value: 6, variant: keyVariant.primary },
  { value: "+", variant: keyVariant.primary },
  { value: 1, variant: keyVariant.primary },
  { value: 2, variant: keyVariant.primary },
  { value: 3, variant: keyVariant.primary },
  { value: "-", variant: keyVariant.primary },
  { value: ".", variant: keyVariant.primary },
  { value: 0, variant: keyVariant.primary },
  { value: "/", variant: keyVariant.primary },
  { value: "x", variant: keyVariant.primary },
  { value: "RESET", variant: keyVariant.secondary, colSpan: true },
  { value: "=", variant: keyVariant.accent, colSpan: true },
];
