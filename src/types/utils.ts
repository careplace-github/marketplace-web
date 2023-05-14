// ----------------------------------------------------------------------

export type IOfficeMapProps = {
  email: string;
  photo?: string;
  address: string;
  country?: string;
  latlng: number[];
  phoneNumber: string;
};

export type WeekdaysProps = {
  value: number;
  text: string;
};

export type ServiceProps = {
  _id: string;
  description: string;
  image: string;
  name: string;
  short_description: string;
};

export type ICountriesProps = {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean | undefined;
};

export type ISocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
};
