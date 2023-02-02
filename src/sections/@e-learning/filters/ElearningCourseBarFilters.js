import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Stack, Drawer, Box, Typography } from '@mui/material';
// config
import { DRAWER_WIDTH, HEADER_DESKTOP_HEIGHT } from '../../../config';
//
import { SearchInput } from '../../../components';
import ElearningCourseFeeFilter from './ElearningCourseFeeFilter';
import ElearningCourseLevelFilter from './ElearningCourseLevelFilter';
import ElearningCourseRatingFilter from './ElearningCourseRatingFilter';
import ElearningCourseLanguageFilter from './ElearningCourseLanguageFilter';
import ElearningCourseDurationFilter from './ElearningCourseDurationFilter';
import ElearningCourseCategoriesFilter from './ElearningCourseCategoriesFilter';
import ElearningCourseFrequencyFilter from './ElearningCourseFrequencyFilter';

// ----------------------------------------------------------------------

const defaultValues = {
  filterDuration: [],
  filterCategories: [],
  filterRating: null,
  filterFee: [],
  filterLevel: [],
  filterLanguage: [],
};

ElearningCourseBarFilters.propTypes = {
  mobileOpen: PropTypes.bool,
  onMobileClose: PropTypes.func,
};

export default function ElearningCourseBarFilters({ mobileOpen, onMobileClose }) {
  const [filters, setFilters] = useState(defaultValues);

  const handleChangeRating = (event) => {
    setFilters({
      ...filters,
      filterRating: event.target.value,
    });
  };

  const handleChangeCategory = (keyword) => {
    setFilters({
      ...filters,
      filterCategories: keyword,
    });
  };

  const handleChangeLevel = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      filterLevel: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChangeFee = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      filterFee: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChangeDuration = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      filterDuration: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleChangeLanguage = (keyword) => {
    setFilters({
      ...filters,
      filterLanguage: keyword,
    });
  };

  const renderFilters = (
    <Stack spacing={2.5}>
      <SearchInput />
      <section>
        <Typography variant="overline" sx={{ mb: 1.5, color: 'text.secondary', display: 'block' }}>
          Duração
        </Typography>
        <ElearningCourseDurationFilter
          filterDuration={filters.filterDuration}
          onChangeDuration={handleChangeDuration}
        />
      </section>

      <section>
        <Typography variant="overline" sx={{ mb: 1.5, color: 'text.secondary', display: 'block' }}>
          Frequência
        </Typography>
        <ElearningCourseFrequencyFilter
          filterDuration={filters.filterDuration}
          onChangeDuration={handleChangeDuration}
        />
      </section>

      <section>
        <Typography variant="overline" sx={{ mb: 1.5, color: 'text.secondary', display: 'block' }}>
          Serviços
        </Typography>
        <ElearningCourseCategoriesFilter
          filterCategories={filters.filterCategories}
          onChangeCategory={handleChangeCategory}
        />
      </section>

      <section>
        <Typography variant="overline" sx={{ mb: 1.5, color: 'text.secondary', display: 'block' }}>
          Experiência
        </Typography>
        <ElearningCourseLevelFilter
          filterLevel={filters.filterLevel}
          onChangeLevel={handleChangeLevel}
        />
      </section>
    </Stack>
  );

  return (
    <>
      {/* -- Desktop -- */}
      <Box
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: {
            xs: 'none',
            md: 'block',
          },
          top: { md: HEADER_DESKTOP_HEIGHT },
          position: { md: 'sticky' },
        }}
      >
        {renderFilters}
      </Box>

      {/* -- Mobile -- */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            pt: 5,
            px: 3,
            width: DRAWER_WIDTH,
          },
        }}
      >
        {renderFilters}
      </Drawer>
    </>
  );
}
