import classes from './Header.module.scss';
import Nav from './Nav';

const Header = () => {
  return (
    <header className={classes.header}>
      <Nav />
    </header>
  );
};
export default Header;
