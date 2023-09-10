// next
import { useRouter } from 'next/router';
// react
import { useEffect } from 'react';
// routes
import { PATHS } from 'src/routes/paths';
// components
import LoadingScreen from 'src/components/loading-screen';
import { useSession } from 'next-auth/react';
//

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { data: user, status } = useSession();

  const isAuthenticated = status === 'authenticated';

  const isLoading = status === 'loading';

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    const { pathname, push } = useRouter();

    useEffect(() => {
      push(PATHS.companies.root);
    }, [pathname, push]);

    return <LoadingScreen />;
  }

  return <>{children}</>;
}
