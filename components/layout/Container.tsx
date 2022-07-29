import classes from './Container.module.scss';
import Header from './Header';
import Main from './Main';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className={classes.container}>
      <Header />
      {children}
    </div>
  );
};
export default Container;
