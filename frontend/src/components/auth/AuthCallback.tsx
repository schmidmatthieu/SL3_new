import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';

export const AuthCallback = () => {
  const router = useRouter();
  const { setToken, setUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const { token } = router.query;

      if (token && typeof token === 'string') {
        try {
          // Store the token
          setToken(token);

          // Fetch user data
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await response.json();
          setUser(userData);

          // Redirect to dashboard or home page
          router.push('/dashboard');
        } catch (error) {
          console.error('Auth callback error:', error);
          router.push('/login?error=auth_failed');
        }
      }
    };

    if (router.isReady) {
      handleCallback();
    }
  }, [router.isReady, router.query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600">Authenticating...</p>
    </div>
  );
};
