import Nav from './Nav';
import classes from './Main.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/router';

type MainProps = {
  children?: React.ReactNode;
  searchQuery?: string;
};

const Main = ({ children, searchQuery }: MainProps) => {
  const router = useRouter();

  const mainClasses = clsx({
    [classes.main]: true,
    [classes.main__home]: router.pathname === '/' && !searchQuery
  });

  return (
    <main className={mainClasses}>
      <Nav />
      {children}
    </main>
  );
};
export default Main;
