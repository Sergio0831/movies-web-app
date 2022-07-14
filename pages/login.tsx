import Login from '@/components/authForm/Login';
import Loading from '@/components/icons/Loading';
import AuthSection from '@/components/sections/AuthSection';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <AuthSection>
        <Loading />
      </AuthSection>
    );
  }
  return (
    <AuthSection>
      <Login />
    </AuthSection>
  );
};
export default LoginPage;
