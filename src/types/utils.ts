// ----------------------------------------------------------------------

export type IOfficeMapProps = {
  email: string;
  photo?: string;
  address: string;
  country?: string;
  latlng: number[];
  phoneNumber: string;
};

export type IWeekDayProps = {
  value: number;
  text: string;
};

export type IServiceProps = {
  _id: string;
  type: 'normal' | 'special';
  description: string;
  image: string;
  name: string;
  short_description: string;
  icon?: string;
};

export type ISocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
};
