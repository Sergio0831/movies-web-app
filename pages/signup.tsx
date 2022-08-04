import { Signup } from '@/components/authForm';
import { Loading } from '@/components/icons';
import AuthSection from '@/components/sections/AuthSection';
import { SEO } from '@/components/ui';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SignupPage: NextPage = () => {
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
    <>
      <SEO title='Registration' description='Register new account' />
      <main>
        <AuthSection aria-labelledby='Signup'>
          <Signup />
        </AuthSection>
      </main>
    </>
  );
};

export default SignupPage;
