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
import { google } from 'google-maps';

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

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

type EnhancedAutocompletePrediction = AutocompletePrediction & {
  id: string;
};

export function LocationFilterKeyword({ onSelect, onLoad, query, sx }: Props) {
  const [selectedOption, setSelectedOption] = useState(null);

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

    setSelectedOption(option);

    setValue(option.description, false);

    clearSuggestions();
  };

  useEffect(() => {
    setValue(query || '', false);
  }, [query]);

  return (
    // If the Google Maps API is loaded, render the Autocomplete component.

    <Autocomplete
      sx={{ width: '100%' }}
      options={enhancedData}
      loadingText="A pesquisar..."
      noOptionsText="Sem resultados"
      value={selectedOption}
      getOptionLabel={(option) => {
        if (option.description) {
          return option.description;
        }
        if (option.structured_formatting?.main_text) {
          return option.structured_formatting.main_text;
        }
        return '';
      }}
      renderOption={(props, option) => {
        return (
          // Only show the icon for the "Search nearby" suggestion.
          (option?.id === 'search_nearby' && (
            <li
              {...props}
              onClick={() => {
                handleClick(option);
              }}
              onKeyDown={() => {
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
                Pesquisar nas proximidades
              </Typography>
            </li>
          )) || (
            // Render the default option
            <li {...props} onClick={() => handleClick(option)}>
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
      onInputChange={(_event, newValue) => {
        setValue(newValue, true);
      }}
      // When the user clicks outside of the search box
      onBlur={() => {
        clearSuggestions();
      }}
      renderInput={(params) => (
        <TextField
          sx={{
            width: '100%',
            '& > div': { width: '100%' },
          }}
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
              width: '100%',
              mr: 2,
              '&:hover': { cursor: 'pointer' },
              ...sx,
            },
          }}
        />
      )}
    />
  );
}
