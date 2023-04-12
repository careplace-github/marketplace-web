import { ISocialLinks } from './utils';

// ----------------------------------------------------------------------

export type IServiceProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImg: string;
  heroImg: string;
  createdAt: Date | string | number;
  galleryImgs: string[];
  website: string;
  socialLinks?: ISocialLinks;
};
