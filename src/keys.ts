import { keyType } from "./enums/keyType";
import { keyVariant } from "./enums/keyVariant";

interface iKeys {
  value: string | number;
  variant: keyVariant;
  keyType: keyType;
  colSpan?: boolean;
}

export const keys: iKeys[] = [
  { keyType: keyType.NUM, value: 7, variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 8, variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 9, variant: keyVariant.primary },
  { keyType: keyType.DELETE, value: "DEL", variant: keyVariant.secondary },
  { keyType: keyType.NUM, value: 4, variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 5, variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 6, variant: keyVariant.primary },
  { keyType: keyType.OP, value: "+", variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 1, variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 2, variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 3, variant: keyVariant.primary },
  { keyType: keyType.OP, value: "-", variant: keyVariant.primary },
  { keyType: keyType.NUM, value: ".", variant: keyVariant.primary },
  { keyType: keyType.NUM, value: 0, variant: keyVariant.primary },
  { keyType: keyType.OP, value: "/", variant: keyVariant.primary },
  { keyType: keyType.OP, value: "x", variant: keyVariant.primary },
  {
    keyType: keyType.RESET,
    value: "RESET",
    variant: keyVariant.secondary,
    colSpan: true,
  },
  {
    keyType: keyType.OP,
    value: "=",
    variant: keyVariant.accent,
    colSpan: true,
  },
];
