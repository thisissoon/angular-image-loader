import { Size, ResponsiveImage } from '../../image-loader/shared/image.model';

export interface ResponsiveVideo {
  videos: Video[];
  poster?: ResponsiveImage;
}

export interface Video {
  size: Size;
  url: string;
}
