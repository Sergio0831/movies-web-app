import AuthForm from '@/components/AuthForm';
import Logo from '@/components/icons/Logo';
import classes from './AuthSection.module.scss';

const AuthSection = () => {
  return (
    <section className={classes.section}>
      <Logo />
      <AuthForm />
    </section>
  );
};
export default AuthSection;
