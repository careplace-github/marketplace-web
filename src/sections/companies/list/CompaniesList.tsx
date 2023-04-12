 
// @mui
import { Pagination, Stack } from '@mui/material';
//
import { CompanyListItem, CompanyListItemSkeleton } from '../item';
// types
import { ICompanyProps } from '../../../types/company';

// ----------------------------------------------------------------------

type Props = {
  companies: ICompanyProps[];
  loading?: boolean;
};

export default function CompaniesList({ companies, loading }: Props) {
  return (
    <>
      <Stack spacing={4}>
        {(loading ? [...Array(9)] : companies).map((company, index) =>
          company ? (
            <CompanyListItem key={company.id} company={company} />
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
