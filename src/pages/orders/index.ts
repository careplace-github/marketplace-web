import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATHS } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    push(PATHS.orders.questionnaire(''));
  }, [pathname, push]);

  return null;
}
