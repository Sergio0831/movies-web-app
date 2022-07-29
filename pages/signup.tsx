import { Signup } from "@/components/AuthForm";
import { Loading } from "@/components/icons";
import AuthSection from "@/components/sections/AuthSection";
import { NextPage } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignupPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
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
    <AuthSection aria-labelledby='Signup'>
      <Signup />
    </AuthSection>
  );
};

export default SignupPage;

