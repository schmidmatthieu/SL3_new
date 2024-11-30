import React from 'react';
import { Button } from '@/components/ui/button';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

export const AuthButtons = () => {
  const { t } = useTranslation('auth');

  const handleGoogleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_AUTH_GOOGLE_URL || '';
  };

  const handleGithubLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_AUTH_GITHUB_URL || '';
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-sm">
      <Button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center space-x-2 w-full bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
      >
        <FaGoogle className="w-5 h-5 text-red-500" />
        <span>{t('continueWithGoogle')}</span>
      </Button>

      <Button
        onClick={handleGithubLogin}
        className="flex items-center justify-center space-x-2 w-full bg-[#24292e] text-white hover:bg-[#2f363d]"
      >
        <FaGithub className="w-5 h-5" />
        <span>{t('continueWithGithub')}</span>
      </Button>
    </div>
  );
};
