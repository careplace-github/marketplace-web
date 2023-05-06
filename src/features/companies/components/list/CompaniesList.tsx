// @mui
import { Pagination, Stack } from '@mui/material';
// hooks
import { useState, useEffect } from 'react';
// types
import { ICompanyProps } from 'src/types/company';
// components
import CompanyListItemSkeleton from '../item/CompanyListItemSkeleton';
import CompanyListItem from '../item/CompanyListItem';

// ----------------------------------------------------------------------

type Props = {
  companies: ICompanyProps[];
  loading?: boolean;
  totalPages?: number;
  onPageChange: Function;
};

export default function CompaniesList({ companies, loading, totalPages, onPageChange }: Props) {
  const [actualPage, setActualPage] = useState(1);

  useEffect(() => {
    console.log('companies:', companies);
  }, [companies]);
  return (
    <>
      <Stack spacing={4}>
        {loading && [...Array(5)].map((company, index) => <CompanyListItemSkeleton key={index} />)}
        {!loading &&
          companies.map((company, index) => (
            <CompanyListItem key={company._id} company={company} />
          ))}
      </Stack>

      <Pagination
        onChange={(e, value) => {
          setActualPage(value);
          onPageChange(value);
        }}
        count={totalPages && totalPages}
        page={actualPage}
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
