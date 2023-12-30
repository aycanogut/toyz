import { icons } from '@/theme';

declare global {
  export type IconLabelProps = (typeof icons)[number]['label'];
}
