import { Login } from "@/components/AuthForm";
import { Loading } from "@/components/icons";
import { AuthSection } from "@/components/sections";
import { SEO } from "@/components/ui";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage = () => {
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
      <main>
        <AuthSection aria-labelledby='Loading'>
          <Loading />
        </AuthSection>
      </main>
    );
  }
  return (
    <>
      <SEO title='Login' />
      <main>
        <AuthSection aria-labelledby='Login'>
          <Login />
        </AuthSection>
      </main>
    </>
  );
};
export default LoginPage;

