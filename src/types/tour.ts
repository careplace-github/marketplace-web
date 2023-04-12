import { IAuthorProps } from './author';
import { ISocialLinks } from './socials';
import { ICourseLessonProp, ICourseTeacherProp } from './course';

// ----------------------------------------------------------------------

export type ITourProps = {
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

export type ITourCheckoutProps = {
  billingAddress: {
    firstName: string;
    lastName: string;
    fullAddress: string;
    fullAddress2: string;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    fullAddress: string;
    fullAddress2: string;
  };
  paymentMethods: {
    methods: string;
    card: {
      cardNumber: string;
      cardHolder: string;
      expirationDate: string;
      ccv: string;
    };
  };
};
