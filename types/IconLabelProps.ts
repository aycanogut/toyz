import icons from '@/theme/icons';

declare global {
  export type IconLabelProps = (typeof icons)[number]['label'];
}
