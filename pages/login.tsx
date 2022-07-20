import Login from '@/components/authForm/Login';
import { Loading } from '@/components/icons';
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
      <AuthSection aria-labelledby='Loading'>
        <Loading />
      </AuthSection>
    );
  }
  return (
    <AuthSection aria-labelledby='Login'>
      <Login />
    </AuthSection>
  );
};
export default LoginPage;
