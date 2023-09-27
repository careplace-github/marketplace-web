// lib
import fetch from 'src/lib/fetch';
// types
import { IServiceProps } from 'src/types/utils';

export const getAvailableServices = async (servicesIds: string[]) => {
  const response = await fetch('/services?documentsPerPage=30', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
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
