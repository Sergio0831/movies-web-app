import { navLinks } from '@/data/navLink';
import { signOut } from 'next-auth/client';
import { Logo } from '../icons';
import { Avatar, Button } from '../ui';
import { useRouter } from 'next/router';
import classes from './Nav.module.scss';

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={classes.nav}>
      <div>
        <Button link='/' ariaLabel='Logo' className={classes.nav__logo}>
          <Logo />
        </Button>
        <ul className={classes.nav__links}>
          {navLinks.map((navLink) => {
            const { icon, link } = navLink;
            return (
              <li key={link}>
                <Button
                  ariaLabel={link}
                  link={link}
                  className={
                    router.asPath === link
                      ? classes['nav__links-active']
                      : undefined
                  }
                >
                  {icon}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        ariaLabel='avatar'
        type='button'
        className={`btn ${classes.nav__avatar}`}
        onClick={() => signOut()}
      >
        <Avatar avatar={'/assets/image-avatar.png'} />
      </Button>
    </nav>
  );
};
export default Nav;
