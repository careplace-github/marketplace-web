// next
import { useRouter } from 'next/router';
// react
import { useEffect } from 'react';
// routes
import { PATHS } from 'src/routes/paths';
// components
import LoadingScreen from 'src/components/loading-screen';
//
import { useAuthContext } from 'src/contexts/useAuthContext';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    const { pathname, push } = useRouter();
    const prevUrl = localStorage.getItem('prevUrl');

    useEffect(() => {
      push(prevUrl || PATHS.companies.root);
    }, [pathname, push]);

    return <LoadingScreen />;
  }

  return <>{children}</>;
}
