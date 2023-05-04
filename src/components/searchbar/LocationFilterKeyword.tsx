// react
import React, { useState, useEffect } from 'react';
// @mui
import { Theme } from '@mui/material/styles';
import { Autocomplete, InputAdornment, SxProps, TextField, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
// components
import Iconify from 'src/components/iconify';
import LoadingScreen from 'src/components/loading-screen';
//
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

// ----------------------------------------------------------------------
type Location = {
  lat: string | null;
  lng: string | null;
};

type Props = {
  onSelect: (location: Location, query: string) => void;
  onLoad?: (isLoading: boolean) => void;
  query?: string;

  sx?: SxProps<Theme>;
};

export function LocationFilterKeyword({ onSelect, onLoad, query, sx }: Props) {
  const isLoaded = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  /**
   * @see https://www.npmjs.com/package/use-places-autocomplete
   */
  const {
    ready,
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

  useEffect(() => {
    if (isLoaded.isLoaded) {
      onLoad && onLoad(false);
    }
  }, [isLoaded.isLoaded]);

  const handleLoad = (isLoading: boolean) => {
    onLoad && onLoad(isLoading);
  };

  const handleSelect = (location: Location) => {};

  const getCoordinates = async (address: string) => {
    let location = {
      lat: '',
      lng: '',
    };

    if (address === 'Pesquisar nas proximidades') {
      const nearbyLocation = await getCurrentLocationCoordinates();
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

  const searchNearby = {
    description: 'Pesquisar nas proximidades',
    id: 'search_nearby',
    structured_formatting: { main_text: 'Pesquisar nas proximidades' },
  };

  // Add the "Search nearby" suggestion to the beginning of the suggestions list.
  const enhancedData = status === 'OK' && value !== '' ? [searchNearby, ...data] : [searchNearby];

  const getCurrentLocationCoordinates = async () => {
    const location = {
      lat: '',
      lng: '',
    };
    if (navigator.geolocation) {
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
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    return location;
  };

  const handleClick = async (option: any) => {
    const location = await getCoordinates(option.description);

    onSelect(location, option.description);

    setValue(option.description, false);

    clearSuggestions();
  };

  /**
  *  useEffect(() => {
    setValue(query || '', false);
  }, [query]);
  */

  return (
    // If the Google Maps API is loaded, render the Autocomplete component.
    <>
      <Autocomplete
        sx={{ width: 1 }}
        options={enhancedData}
        value={value}
        getOptionLabel={(option) => {
          return option.description
            ? option.description
            : option.structured_formatting?.main_text
            ? option.structured_formatting.main_text
            : option || '';
        }}
        renderOption={(props, option) => {
          return (
            // Only show the icon for the "Search nearby" suggestion.
            (option.id === 'search_nearby' && (
              <li
                {...props}
                onClick={() => {
                  handleClick(option);
                }}
              >
                <Iconify
                  width={15}
                  icon="tabler:location-filled"
                  sx={{
                    color: 'text.disabled',
                    alignSelf: 'left',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    pl: 1.5,
                    color: 'text.disabled',
                  }}
                >
                  {option.description}
                </Typography>
              </li>
            )) || (
              // Show the default option as a regular Material-UI Autocomplete option.
              <li
                {...props}
                onClick={() => {
                  handleClick(option);
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.disabled',
                  }}
                >
                  {option.structured_formatting.main_text},{' '}
                  {option.structured_formatting.secondary_text}
                </Typography>
              </li>
            )
          );
        }}
        // When the user types an address in the search box
        onInputChange={(_event, value) => {
          // When the user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(value);
        }}
        // When the user selects a place from the dropdown menu
        onChange={(_event, value) => {
          // When the user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(value, false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            hiddenLabel
            variant="filled"
            placeholder="Cidade, Rua, Código Postal..."
            InputProps={{
              ...params.InputProps,
              autoComplete: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    width={20}
                    icon="carbon:location"
                    sx={{
                      color: 'text.disabled',
                      mr: 0.5,
                      ml: -1.5,
                      alignSelf: 'left',
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                pb: 1,
                mr: 2,
                '&:hover': { cursor: 'pointer' },
                ...sx,
              },
            }}
          />
        )}
      />
    </>
  );
}
