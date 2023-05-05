import { IOrderProps } from '../types/order';

export const getRecurrencyText = (order: IOrderProps) => {
  let text = '';
  let recurrency = order.schedule_information.recurrency;

  if(recurrency === 0) text = 'Pedido Único';
 else if (recurrency === 1) {
    text = 'Semanal';
  } else if (recurrency === 2) {
    text = 'Quinzenal';
  } else if (recurrency === 4) {
    text = 'Mensal';
  }
  return text;
};

export const getScheduleText = (order: IOrderProps) => {
  let text = '';
  let schedule = order.schedule_information.schedule;

  schedule.forEach((item) => {
    let week_day = item.week_day;
    let start = item.start;
    let end = item.end;

    if (week_day === 1) {
      text += 'Segundas-feiras: ';
    } else if (week_day === 2) {
      text += 'Terças-feiras: ';
    } else if (week_day === 3) {
      text += 'Quartas-feiras: ';
    } else if (week_day === 4) {
      text += 'Quintas-feiras: ';
    } else if (week_day === 5) {
      text += 'Sextas-feiras: ';
    } else if (week_day === 6) {
      text += 'Sábados: ';
    } else if (week_day === 7) {
      text += 'Domingos: ';
    }

    text += `${start} - ${end}; `;
  });

  return text;
};
