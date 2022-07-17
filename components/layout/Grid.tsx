import classes from './Grid.module.scss';

type GridProps = {
  children: React.ReactNode;
};

const Grid = ({ children }) => {
  return <div className={classes.grid}>{children}</div>;
};
export default Grid;
