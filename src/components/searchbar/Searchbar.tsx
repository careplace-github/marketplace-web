// react
import React, { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// mui
import {
  Box,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
// routes
import { PATHS } from 'src/routes/paths';
// types
import { ILocationFiltersProps } from './types';
//
import { StyledBar } from './styles';
import { LocationFilterKeyword } from './LocationFilterKeyword';

// ----------------------------------------------------------------------

type FiltersProps = {
  lat: string | null;
  lng: string | null;
  query?: string;
};

type SearchbarProps = {
  onSearch?: () => void;
  onLoad?: (isLoading: boolean) => void;
};

type Location = {
  lat: string | null;
  lng: string | null;
};

export default function Searchbar({ onSearch, onLoad }: SearchbarProps) {
  const { pathname, push, query } = useRouter();
  const router = useRouter();

  const [filters, setFilters] = useState<FiltersProps>({
    lat: null,
    lng: null,
    query: '',
  });

  useEffect(() => {
    if (router.isReady) {
      if (router.query) {
        setFilters({
          lat: router.query.lat as string,
          lng: router.query.lng as string,
          query: router.query.query as string,
         
        });
      }
    }
  }, [router.isReady]);
  const isMdUp = useResponsive('up', 'md');

  const handleSelect = (location: Location, filterQuery: string) => {
    setFilters({
      lat: location.lat,
      lng: location.lng,
      query: filterQuery,
    });
  };

  const handleSearch = () => {
    push({
      pathname: PATHS.companies.root,
      query: {
        ...query, // preserve existing query params
        ...filters,
        page: 1,
      },
    });
  };

  useEffect(() => {
    if (filters.lat && filters.lng) {
      // handleSearch();
    }
  }, [filters]);

  return (
    <Stack direction="row" alignItems="center">
      <StyledBar
        spacing={{ xs: 0, md: 0 }}
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          width: !isMdUp ? '100%' : '400px',
          height: 50,
          px: 2,
          justifyContent: 'space-between',
          bgcolor: 'transparent',
          boxShadow: 'none',
          '&:hover': { bgcolor: 'transparent' },
        }}
      >
        <LocationFilterKeyword
          onSelect={handleSelect}
          query={filters.query}
          sx={{
            alignSelf: 'left',
            bgcolor: 'transparent',
            '&:hover, &.Mui-focused': { bgcolor: 'transparent' },
            width: { xs: 250, md: 300 },
          }}
        />

        <Button
          size="large"
          variant="contained"
          sx={{
            position: 'relative',
            px: 0,
            minWidth: { xs: 30, md: 35 },
            width: { xs: 30, md: 35 },
            height: { xs: 30, md: 35 },
            ml: 'auto',
            '@media (max-width: 600px)': {
              minWidth: 25,
              width: 25,
              height: 25,
            },
          }}
          onClick={handleSearch}
        >
          <Iconify icon="carbon:search" width={20} />
        </Button>
      </StyledBar>
    </Stack>
  );
}
