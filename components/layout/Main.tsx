import classes from './Main.module.scss';
import { ToastContainer } from 'react-toastify';

type MainProps = {
  children?: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className={classes.main}>
      {children}
      <ToastContainer
        position='top-right'
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};
export default Main;
