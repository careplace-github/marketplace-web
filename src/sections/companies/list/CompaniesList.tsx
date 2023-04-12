import PropTypes from 'prop-types';
// @mui
import { Pagination, Stack } from '@mui/material';
//
import { CompanyListItem, CompanyListItemSkeleton } from '../item';
// types
import { ICourseProps } from '../../../types/course';

// ----------------------------------------------------------------------

type Props = {
  courses: ICourseProps[];
  loading?: boolean;
};

export default function ElearningCourseList({ courses, loading }: Props) {
  return (
    <>
      <Stack spacing={4}>
        {(loading ? [...Array(9)] : courses).map((course, index) =>
          course ? (
            <CompanyListItem key={course.id} course={course} />
          ) : (
            <CompanyListItemSkeleton key={index} />
          )
        )}
      </Stack>

      <Pagination
        count={10}
        color="primary"
        size="large"
        sx={{
          my: 10,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
