//
import { IServiceProps, ISocialLinks } from './utils';

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

export type IExtraServices = {
  icon: string;
  label: string;
  value: string;
};

export type ICompanyDetailsCover = {
  name: string;
  image: string;
  location: string;
};

type IAddressProps = {
  city: string;
  coordinates: number[];
  country: string;
  postal_code: string;
  street: string;
  _id: string;
};

export type ICompanyProps = {
  _id: string;
  createdAt: string;
  business_profile: {
    about: string;
    email: string;
    logo: string;
    name: string;
    phone: string;
    social_links?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
    address: IAddressProps;
    website?: string;
  };
  pricing: {
    average_hourly_rate: number;
    minimum_hourly_rate: number;
  };
  rating: {
    average: number;
    count: number;
  };
  is_active: boolean;
  service_area: {
    type: string;
    coordinates: any[];
  };
  services: string[];
};

export type ICompanyFiltersProps = {
  filterWeekdays: number[];
  filterServices: IServiceProps[];
  filterRecurrency: number | undefined;
  name: string | undefined;
};
