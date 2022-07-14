import Nav from './Nav';
import classes from './Main.module.scss';

type MainProps = {
  children?: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className={classes.main}>
      <Nav />
      {children}
    </main>
  );
};
export default Main;
