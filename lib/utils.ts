import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const scootopiaColors = [
  "scootopia-black",
  "scootopia-white",
  "scootopia-gray-10",
  "scootopia-gray-20",
  "scootopia-gray-30",
  "scootopia-gray-40",
  "scootopia-gray-50",
  "scootopia-gray-60",
  "scootopia-gray-70",
  "scootopia-gray-80",
  "scootopia-gray-90",
  "scootopia-gray-100",
  "scootopia-accent",
  "scootopia-accent-fg",
  "scootopia-success",
  "scootopia-warning",
  "scootopia-error",
  "scootopia-network-error",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [{ text: scootopiaColors }],
      "bg-color": [{ bg: scootopiaColors }],
      "border-color": [{ border: scootopiaColors }],
      "ring-color": [{ ring: scootopiaColors }],
      "outline-color": [{ outline: scootopiaColors }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
