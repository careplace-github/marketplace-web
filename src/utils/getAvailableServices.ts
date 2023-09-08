// axios
import axios from 'src/lib/axios';
// types
import { IServiceProps } from 'src/types/utils';

export const getAvailableServices = async (servicesIds: string[]) => {
  const response = await axios.get('/services', { params: { documentsPerPage: 30 } });
  const allServices: IServiceProps[] = response.data.data;
  const availableServices: IServiceProps[] = [];
  allServices.forEach((item) => {
    servicesIds.forEach((service) => {
      if (item._id === service) {
        availableServices.push(item);
      }
    });
  });

  return availableServices;
};
