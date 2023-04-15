import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATHS } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {

    push(PATHS.account.personal);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
