// ----------------------------------------------------------------------

export type IUserProps = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      country: string;
    };
  };
  password: string;
};
