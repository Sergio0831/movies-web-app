import classes from './Main.module.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toastClassName='toast'
        bodyClassName='toast__body'
        progressClassName='toast__progress'
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};
export default Main;
