import Logo from '@/components/icons/Logo';
import classes from './AuthSection.module.scss';

type AuthSectionProps = {
  children: React.ReactNode;
};

const AuthSection = ({ children }: AuthSectionProps) => {
  return (
    <section className={classes.section}>
      <Logo />
      {children}
    </section>
  );
};
export default AuthSection;
