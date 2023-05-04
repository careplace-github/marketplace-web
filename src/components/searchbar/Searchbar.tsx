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
// types
import { ILocationFiltersProps } from './types';
// components
import Iconify from 'src/components/iconify';
//
import { StyledBar } from './styles';
import { LocationFilterKeyword } from './LocationFilterKeyword';
// routes
import { PATHS } from 'src/routes/paths';

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
    lat: '',
    lng: '',
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

  const handleLoad = (isLoading: boolean) => {
    onLoad && onLoad(isLoading);
  };

  const handleSelect = (location: Location, query: string) => {
    setFilters({
      lat: location.lat,
      lng: location.lng,
      query,
    });
  };

  const handleSearch = () => {
    push({
      pathname: PATHS.companies.root,
      query: {
        ...query, // preserve existing query params
        ...filters,
      },
    });
  };

  return (
    <Stack direction="row" alignItems="center">
      <StyledBar
        spacing={{ xs: 0, md: 0 }}
        sx={{
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
          onLoad={handleLoad}
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
          onClick={onSearch ? onSearch : handleSearch}
        >
          <Iconify icon="carbon:search" width={20} />
        </Button>
      </StyledBar>
    </Stack>
  );
}
