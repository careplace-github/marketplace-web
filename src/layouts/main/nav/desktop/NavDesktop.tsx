// react
import { useState } from 'react';
// @mui
import { Stack } from '@mui/material';
// components
import { Searchbar } from 'src/components/searchbar';
import LoadingScreen from 'src/components/loading-screen';
//
import { NavProps } from '../types';
import NavList from './NavList';


// ----------------------------------------------------------------------


type NavDesktopProps = {
  sx?: object;
};

export default function NavDesktop({ sx }: NavDesktopProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Stack
      component="nav"
      direction="row"
      spacing={6}
      sx={{
        ml: 6,
        height: 1,
        alignItems: 'center',
        ...sx,
      }}
    >
      <Searchbar  />
    </Stack>
  );
}
