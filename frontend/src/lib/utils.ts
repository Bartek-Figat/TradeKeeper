import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const cn = (...args: classNames.ArgumentArray) =>
  twMerge(classNames(args));

export const capitalizeString = (s: string) =>
  s.charAt(0).toUpperCase() + s.substring(1);
