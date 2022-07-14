import Signup from '@/components/authForm/Signup';
import Loading from '@/components/icons/Loading';
import AuthSection from '@/components/sections/AuthSection';
import { NextPage } from 'next';
import { getSession } from 'next-auth/client';
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
      <AuthSection>
        <Loading />
      </AuthSection>
    );
  }

  return (
    <AuthSection>
      <Signup />
    </AuthSection>
  );
};

export default SignupPage;
