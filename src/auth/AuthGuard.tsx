import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/login';
import { AuthContext } from './AuthContext';
import { PATHS } from '../routes/paths';

// ----------------------------------------------------------------------
type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = AuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);



    useEffect(() => {
      push(PATHS.orders.questionnaire(''));
    }, [pathname, push]);
  }

  return <> {children} </>;
}