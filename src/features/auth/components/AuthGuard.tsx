import { useEffect } from 'react';
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
  const { isAuthenticated, user, isInitialized } = useAuthContext();

  // Return loading screen if auth context is not initialized
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated && !user?.email) {
    const { push, asPath } = useRouter();

    // Redirect to login page
    useEffect(() => {
      localStorage.setItem('prevUrl', asPath);
      push(PATHS.auth.login);
    }, [push]);

    return <LoadingScreen />;
  }

  return <> {children} </>;
}
