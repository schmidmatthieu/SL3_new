import { AuthCallback } from '@/components/auth/AuthCallback';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication Callback',
  description: 'Processing your authentication...',
};

export default function AuthCallbackPage() {
  return <AuthCallback />;
}
