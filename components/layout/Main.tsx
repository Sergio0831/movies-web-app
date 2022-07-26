import Nav from './Nav';
import classes from './Main.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position='top-right'
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};
export default Main;
