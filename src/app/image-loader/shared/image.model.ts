export interface ResponsiveImage {
  xs?: RetinaImage;
  sm?: RetinaImage;
  md?: RetinaImage;
  lg?: RetinaImage;
  xl?: RetinaImage;
  placeholder: string;
  fallback: string;
}

export interface RetinaImage {
  '@1x'?: string;
  '@2x'?: string;
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Retina = '@1x' | '@2x';

export interface Breakpoint {
  size: Size;
  width: number;
}
