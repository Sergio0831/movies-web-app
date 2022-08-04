import clsx from 'clsx';
import classes from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
};

const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  const errorMessageClasses = clsx(
    {
      'body-s': true,
      [classes.error]: true
    },
    className
  );

  return <p className={errorMessageClasses}>{children}</p>;
};
export default ErrorMessage;
