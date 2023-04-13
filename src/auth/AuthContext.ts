import { useContext } from 'react';
//
import { JwtAuthContext } from './JwtContext';

// ----------------------------------------------------------------------

export const useAuthContext = () => {
  const context = useContext(JwtAuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};