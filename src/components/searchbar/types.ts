import { Props } from 'simplebar-react';
// @mui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface ScrollbarProps extends Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export type ILocationFiltersProps = {
  filterKeyword: string | null;
  filterCategories: string | null;
  filterType: string[];
  filterWeekdays: string[];
  filterBenefits: string[];
  filterSalary: number[];
};
