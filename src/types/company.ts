//
import { ICountriesProps, ISocialLinks } from './utils';

// ----------------------------------------------------------------------

export type ICompanyResponsibleProps = {
  id?: string;
  name?: string;
  role?: string;
  picture?: string;
  about?: string;
  quotes?: string;
  phoneNumber?: string;
  verified?: boolean;
  ratings?: number;
  reviews?: number;
  socialLinks?: ISocialLinks;
  courses?: number;
  students?: number;
};

export type ICompanyProps = {
  id: string;
  slug: string;
  price: number;
  level: string;
  ratings: number;
  quizzes: number;
  reviews: number;
  coverImg: string;
  category: string;
  skills: string[];
  students: number;
  priceSale: number;
  resources: number;
  totalHours: number;
  description: string;
  bestSeller: boolean;
  languages: string[];
  learnList: string[];
  shareLinks: ISocialLinks;
  teachers: ICompanyResponsibleProps[];
  createdAt: Date | string | number;
  location: string;
  duration: string;
  continent: string;
  gallery: string[];
  favorited: boolean;
  highlights: string[];
  tourGuide: ICompanyResponsibleProps;
  availableEnd: Date | string | number;
  availableStart: Date | string | number;
  program: {
    label: string;
    text: string;
  }[];
  includes: {
    label: string;
    enabled: boolean;
  }[];

};

export type ICompanyFiltersProps = {
  filterFee: string[];
  filterLevel: string[];
  filterDuration: string[];
  filterCategories: string[];
  filterRating: string | null;
  filterLanguage: ICountriesProps[];
};

