//
import { ICountriesProps } from './contact';
import { ISocialLinks } from './socials';
import { IAuthorProps } from './author';


// ----------------------------------------------------------------------

export type ICourseTeacherProp = {
  id: string;
  name: string;
  role: string;
  ratings: number;
  picture: string;
  courses: number;
  reviews: number;
  students: number;
};

export type ICourseLessonProp = {
  id: string;
  title: string;
  duration: number;
  videoPath: string;
  isUnLock: boolean;
  description: string;
};

export type ICourseByCategoryProps = {
  id: string;
  name: string;
  students: number;
};

export type ICourseProps = {
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
  lessons: ICourseLessonProp[];
  teachers: ICourseTeacherProp[];
  createdAt: Date | string | number;



  
  location: string;
  duration: string;
  continent: string;
  gallery: string[];
  favorited: boolean;
  highlights: string[];
  tourGuide: IAuthorProps;
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

export type ICourseFiltersProps = {
  filterFee: string[];
  filterLevel: string[];
  filterDuration: string[];
  filterCategories: string[];
  filterRating: string | null;
  filterLanguage: ICountriesProps[];
};

