// react
import React, { useState, useEffect, useRef } from 'react';
// next
import { useRouter } from 'next/router';
// mui
import { Box, Stack, Button, TextField, Snackbar, Alert } from '@mui/material';
// google api
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useResponsive from 'src/hooks/useResponsive';
import { google } from 'google-maps';

// components
import Iconify from 'src/components/iconify';
// routes
import { PATHS } from 'src/routes/paths';
// types
import { ISnackbarProps } from 'src/types/snackbar';

// ----------------------------------------------------------------------

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

type EnhancedAutocompletePrediction = AutocompletePrediction & {
  id: string;
};

type FiltersProps = {
  lat: string | null;
  lng: string | null;
  query?: string;
  applied: boolean;
};

type SearchbarProps = {
  onSearch?: () => void;
  onLoad?: (isLoading: boolean) => void;
  fullWidth?: boolean;
  urlToRedirect?: string;
};

type Location = {
  lat: string | null;
  lng: string | null;
};

export default function Searchbar({
  onSearch,
  onLoad,
  fullWidth,
  urlToRedirect = PATHS.search.homeCare.companies.root,
}: SearchbarProps) {
  const { push, query } = useRouter();
  const isSmUp = useResponsive('up', 'sm');
  const searchbarRef = useRef<HTMLDivElement | null>();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [filters, setFilters] = useState<FiltersProps>({
    lat: null,
    lng: null,
    query: '',
    applied: false,
  });
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // Restrict the results to Portugal
      componentRestrictions: { country: 'pt' },
    },
    // Only request every 300ms.
    debounce: 300,
    // Cache the results for 24 hours.
    cache: 24 * 60 * 60,
  });

  const getCoordinates = async (address: string) => {
    let location = {
      lat: '',
      lng: '',
    };

    if (address === 'Pesquisar nas proximidades') {
      const nearbyLocation = await getCurrentLocationCoordinates();
      if (nearbyLocation === 'error') {
        return 'error';
      }
      location = {
        lat: nearbyLocation.lat,
        lng: nearbyLocation.lng,
      };
    } else {
      const results = await getGeocode({ address });

      const { lat, lng } = getLatLng(results[0]);

      location = {
        lat: lat.toString(),
        lng: lng.toString(),
      };
    }

    return location;
  };

  const searchNearby: EnhancedAutocompletePrediction = {
    description: 'Pesquisar nas proximidades',
    id: 'search_nearby',
    matched_substrings: [],
    place_id: 'search_nearby',
    reference: 'search_nearby',

    terms: [
      {
        offset: 0,
        value: 'Pesquisar nas proximidades',
      },
    ],
    types: ['geocode'],

    structured_formatting: {
      main_text_matched_substrings: [],
      main_text: 'Pesquisar nas proximidades',
      secondary_text: 'Pesquisar nas proximidades',
    },
  };

  // Add the "Search nearby" suggestion to the beginning of the suggestions list.
  const [enhancedData, setEnhancedData] = useState([searchNearby, ...data]);

  useEffect(() => {
    if (status === 'OK' && value !== '') {
      setEnhancedData([searchNearby, ...data]);
    } else {
      setEnhancedData([searchNearby]);
    }
  }, [status, data, value]);

  const getCurrentLocationCoordinates = async () => {
    const location = {
      lat: '',
      lng: '',
    };
    if (navigator.geolocation) {
      try {
        await new Promise<void>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              location.lat = position.coords.latitude.toString();
              location.lng = position.coords.longitude.toString();

              resolve();
            },
            () => reject(new Error('Error: The Geolocation service failed.'))
          );
        });
      } catch (error) {
        setShowSnackbar({
          show: true,
          severity: 'info',
          message:
            'Não foi possível aceder à sua localização. Para aceder a esta funcionalidade altere as permissões do seu browser',
        });
        return 'error';
      }
    } else {
      setShowSnackbar({
        show: true,
        severity: 'info',
        message:
          'Não foi possível aceder à sua localização. Para aceder a esta funcionalidade altere as permissões do seu browser',
      });
      return 'error';
    }

    return location;
  };

  const handleSelect = (location: Location, filterQuery: string) => {
    setFilters({
      lat: location.lat,
      lng: location.lng,
      query: filterQuery,
      applied: true,
    });
  };

  const handleClick = async (option: any) => {
    const location = await getCoordinates(option.description);

    if (location != 'error') {
      setSelectedOption(option);
      setValue(option.description);
      clearSuggestions();
      setOpenOptions(false);
      handleSelect(location, option.description);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ---------------------------------------- //

  useEffect(() => {
    if (router.isReady) {
      if (router.query.lat || router.query.lng || router.query.query) {
        setFilters({
          lat: router.query.lat as string,
          lng: router.query.lng as string,
          query: router.query.query as string,
          applied: true,
        });
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        applied: false,
      };
    });
    const pathWithoutQueries = router.asPath.split('?')[0];
    if (pathWithoutQueries !== PATHS.search.homeCare.companies.root) {
      setValue('');
      setSelectedOption(null);
    }
  }, [router.asPath]);

  const isMdUp = useResponsive('up', 'md');

  const handleSearch = () => {
    push({
      pathname: urlToRedirect,
      query: {
        ...query, // preserve existing query params
        ...filters,
        page: 1,
      },
    });
  };

  useEffect(() => {
    if (filters.applied) {
      handleSearch();
    }
  }, [filters]);

  const handleClearClick = () => {
    setValue('');
    setFilters({
      lat: null,
      lng: null,
      query: '',
      applied: true,
    });
    setSelectedOption(null);
  };

  return (
    <Box
      ref={searchbarRef}
      sx={{ width: !isMdUp || fullWidth ? '100%' : '400px', position: 'relative' }}
    >
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() =>
          setShowSnackbar({
            show: false,
            severity: 'success',
            message: '',
          })
        }
      >
        <Alert
          onClose={() =>
            setShowSnackbar({
              show: false,
              severity: 'success',
              message: '',
            })
          }
          severity={showSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
      <TextField
        autoComplete="off"
        placeholder="Cidade, Rua, Código Postal..."
        onFocus={() => setOpenOptions(true)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        InputProps={{
          sx: { backgroundColor: 'white' },
          endAdornment: (
            <Stack direction="row" alignItems="center" justifyContent="flex-end" gap="10px">
              {selectedOption && (
                <Iconify
                  width={20}
                  icon="ic:round-close"
                  onClick={handleClearClick}
                  sx={{
                    cursor: 'pointer',
                    color: 'text.disabled',
                    alignSelf: 'left',
                  }}
                />
              )}
              <Button
                aria-label="search"
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
                <Iconify icon="carbon:search" width={isSmUp ? 20 : 15} />
              </Button>
            </Stack>
          ),
          startAdornment: (
            <Iconify
              width={20}
              icon="carbon:location"
              sx={{
                color: 'text.disabled',
                mr: 1,
                alignSelf: 'left',
              }}
            />
          ),
        }}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.disabled',
          },
          touchAction: 'manipulation',
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'text.disabled',
            },
          },
        }}
      />
      {openOptions && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: 'auto',
            maxHeight: '300px',
            backgroundColor: 'white',
            borderRadius: '8px',
            mt: '10px',
            zIndex: '10',
            boxShadow:
              'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
            overflowY: 'auto',
          }}
        >
          {enhancedData.map((item) => {
            return (
              <Stack
                onClick={() => handleClick(item)}
                key={item.description}
                sx={{
                  width: '100%',
                  cursor: 'pointer',
                  p: '15px 10px',
                  gap: '10px',
                  '&:hover': { backgroundColor: '#EBEBEB' },
                }}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                {item.id === 'search_nearby' && (
                  <Iconify
                    width={15}
                    icon="tabler:location-filled"
                    sx={{
                      color: 'text.disabled',
                      alignSelf: 'left',
                    }}
                  />
                )}
                {item.description}
              </Stack>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
