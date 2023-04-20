import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from 'src/components/loading-screen';
//
import { useAuthContext } from 'src/contexts/useAuthContext';
import { PATHS } from 'src/routes/paths';

// ----------------------------------------------------------------------
type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  // Return loading screen if auth context is not initialized
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    // Save requested location if user is not authenticated
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    // Redirect to login page
    useEffect(() => {
      push(PATHS.auth.login);
    },
      [push]);
  }

  // Redirect to requested location if user is authenticated
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);

    useEffect(() => {
      push(PATHS.companies.root);
    }, [pathname, push]);
  }

  return <> {children} </>;
}