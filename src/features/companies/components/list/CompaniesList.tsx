// @mui
import { Pagination, Stack } from '@mui/material';
// hooks
import { useState, useEffect } from 'react';
// types
import { ICompanyProps } from 'src/types/company';
// components
import CompanyListItemSkeleton from '../item/CompanyListItemSkeleton';
import CompanyListItem from '../item/CompanyListItem';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

type Props = {
  companies: ICompanyProps[];
  loading?: boolean;
  totalPages?: number;
  onPageChange: Function;
};

export default function CompaniesList({ companies, loading, totalPages, onPageChange }: Props) {
 
  const router = useRouter();



  // Get page from query string
  const [actualPage, setActualPage]  = useState(router.query.page ? parseInt(router.query.page as string) : 1);

  useEffect(() => {
    // CHeck if router is ready
    if (!router.isReady) return;
    setActualPage(router.query.page ? parseInt(router.query.page as string) : 1);
  }, [router.query.page]);



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
