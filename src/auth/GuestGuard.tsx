// next
import { useRouter } from 'next/router';
// react
import { useState, useEffect } from 'react';
// routes
import { PATHS } from '../routes/paths';
// components
import LoadingScreen from '../components/loading-screen';
//
import { AuthContext } from './AuthContext';

// ----------------------------------------------------------------------


type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isInitialized } = AuthContext();

  if (isAuthenticated) {
    
    const { pathname, push } = useRouter();

  useEffect(() => {
    push(PATHS.orders.questionnaire(''));
  }, [pathname, push]);
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
