// next
import { useRouter } from 'next/router';
// react
import { useEffect } from 'react';
// routes
import { PATHS } from '../routes/paths';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './AuthContext';

// ----------------------------------------------------------------------


type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) {
    
    const { pathname, push } = useRouter();

  useEffect(() => {
    push(PATHS.account.root);
  }, [pathname, push]);
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
