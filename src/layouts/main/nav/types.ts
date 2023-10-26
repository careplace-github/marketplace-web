import { Theme } from '@mui/material/styles';
import { ListItemButtonProps, SxProps } from '@mui/material';
import React, { JSXElementConstructor } from 'react';

// ----------------------------------------------------------------------

export type NavItemBaseProps = {
  id?: string;
  title: string;
  path?: string;
  icon?: React.ReactElement<any, string | JSXElementConstructor<any>> | string;
  children?: NavListProps[];
  subItems?: any;
  isOpener?: boolean;
};

export type NavListProps = {
  type: string;
  subheader: string;
  isNew?: boolean;
  cover?: string;
  items: { title: string; path: string; icon?: string }[];
  children?: Array<any>;
};

export type NavItemProps = ListItemButtonProps & {
  item: NavItemBaseProps;
  active?: boolean;
  open?: boolean;
  subItem?: boolean;
  isExternalLink?: boolean;
};

export type NavProps = {
  data: NavItemBaseProps[];
  sx?: SxProps<Theme>;
};
