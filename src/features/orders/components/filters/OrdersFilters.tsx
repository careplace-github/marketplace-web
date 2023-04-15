 
import { useState } from 'react';
// @mui
import { Stack, Button, Divider, StackProps } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
//
import { FilterTime, FilterGuests, FilterLocation } from './components';
 

// ----------------------------------------------------------------------

export default function OrderQuestionnaireFilters({ sx, ...other }: StackProps) {
  const [departureDay, setDepartureDay] = useState<Date | null>(null);

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
  });

  const handleChangeDepartureDay = (newValue: Date | null) => {
    setDepartureDay(newValue);
  };

  const handleIncrementGuests = (guest?: string) => {
    if (guest === 'children') {
      setGuests({ ...guests, children: guests.children + 1 });
    } else {
      setGuests({ ...guests, adults: guests.adults + 1 });
    }
  };

  const handleDecreaseGuests = (guest?: string) => {
    if (guest === 'children') {
      setGuests({ ...guests, children: guests.children - 1 });
    } else {
      setGuests({ ...guests, adults: guests.adults - 1 });
    }
  };

  return (
    <Stack
      spacing={2.5}
      alignItems={{ md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 4, borderRadius: 2, bgcolor: 'background.neutral', ...sx }}
      {...other}
    >
      <FilterLocation />

      <Divider flexItem orientation="vertical" />

      <FilterTime
        departureDay={departureDay}
        onChangeDepartureDay={handleChangeDepartureDay}
      />

      <Divider flexItem orientation="vertical" />

      <FilterGuests
        guests={guests}
        onDecreaseGuests={handleDecreaseGuests}
        onIncrementGuests={handleIncrementGuests} 
        sx={undefined}      
        />

      <Button
        size="large"
        color="secondary"
        variant="contained"
        sx={{
          px: 0,
          flexShrink: 0,
          minWidth: { xs: 1, md: 48 },
        }}
      >
        <Iconify icon="carbon:search" />
      </Button>
    </Stack>
  );
}
