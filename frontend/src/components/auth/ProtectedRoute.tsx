import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  // Show loading or nothing while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
