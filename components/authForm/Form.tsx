import classes from './Form.module.scss';

type FormProps = {
  title: string;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler;
};

const Form = ({ title, children, onSubmit }: FormProps) => {
  return (
    <form noValidate className={classes.form} onSubmit={onSubmit}>
      <h1 className='heading-l'>{title}</h1>
      {children}
    </form>
  );
};
export default Form;
