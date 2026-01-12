import { cx, CxOptions } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes using `clsx` (via CVA) and `tailwind-merge`.
 * This utility handles conditional classes and ensures that Tailwind's
 * specificity rules are respected by merging conflicting classes.
 *
 * @param {...CxOptions} inputs - Variadic list of class names, objects, or arrays.
 * @returns {string} The merged and optimized class string.
 */
function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

export default cn;
