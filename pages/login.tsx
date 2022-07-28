import { Login } from '@/components/authForm';
import { Loading } from '@/components/icons';
import { AuthSection } from '@/components/sections';
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
      <main>
        <AuthSection aria-labelledby='Loading'>
          <Loading />
        </AuthSection>
      </main>
    );
  }
  return (
    <main>
      <AuthSection aria-labelledby='Login'>
        <Login />
      </AuthSection>
    </main>
  );
};
export default LoginPage;
