import { ResponsiveVideo } from './video-loader/shared/video.model';
import { ResponsiveImage } from './image-loader/shared/image.model';
import { Breakpoint } from './image-loader/shared/breakpoint.model';

export const image: ResponsiveImage = {
  placeholder: 'http://via.placeholder.com/40x40?text=placeholder',
  fallback: 'http://via.placeholder.com/400x400?text=fallback',
  images: [
    {
      size: 'xs',
      x1: 'http://via.placeholder.com/400x400?text=xs+1x',
      x2: 'http://via.placeholder.com/800x800?text=xs+2x',
    },
    {
      size: 'md',
      x1: 'http://via.placeholder.com/768x400?text=md+1x',
      x2: 'http://via.placeholder.com/1536x800?text=md+2x',
    },
    {
      size: 'lg',
      x1: 'http://via.placeholder.com/1024x400?text=lg+1x',
      x2: 'http://via.placeholder.com/2048x800?text=lg+2x',
    },
  ],
};

export const video: ResponsiveVideo = {
  // tslint:disable:max-line-length
  videos: [
    {
      size: 'xs',
      url:
        'http://res.cloudinary.com/thisissoon/video/upload/ac_none,c_fill,h_568,q_80,w_320/v1517616795/demos/jellyfish-25-mbps-hd-hevc.mp4',
    },
    {
      size: 'md',
      url:
        'http://res.cloudinary.com/thisissoon/video/upload/ac_none,c_fill,h_1024,q_80,w_768/v1517616795/demos/jellyfish-25-mbps-hd-hevc.mp4',
    },
    {
      size: 'lg',
      url:
        'http://res.cloudinary.com/thisissoon/video/upload/ac_none,c_fill,h_720,q_80,w_1280/v1517616795/demos/jellyfish-25-mbps-hd-hevc.mp4',
    },
  ],
  poster: {
    placeholder:
      'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_56,q_1,w_32/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
    fallback:
      'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_568,q_80,w_320/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
    images: [
      {
        size: 'xs',
        x1:
          'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_568,q_80,w_320/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
        x2:
          'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_1136,q_80,w_640/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
      },
      {
        size: 'md',
        x1:
          'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_768,q_80,w_1024/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
        x2:
          'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_1536,q_80,w_2048/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
      },
      {
        size: 'lg',
        x1:
          'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_768,q_80,w_1280/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
        x2:
          'http://res.cloudinary.com/thisissoon/image/upload/c_fill,h_1536,q_80,w_2560/v1517616811/demos/jellyfish-25-mbps-hd-hevc_lpnffm.jpg',
      },
    ],
  },
};
// tslint:enable:max-line-length

export const sizes: Breakpoint[] = [
  { size: 'xs', width: 0 },
  { size: 'md', width: 768 },
  { size: 'lg', width: 992 },
];
