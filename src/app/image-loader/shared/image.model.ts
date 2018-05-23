export interface ResponsiveImage {
  placeholder: string;
  fallback: string;
  images: RetinaImage[];
}

export interface RetinaImage {
  size: Size;
  x1?: string;
  x2?: string;
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
