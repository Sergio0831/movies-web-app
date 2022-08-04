import classes from './Label.module.scss';

type LabelProps = {
  label: string;
  children: React.ReactNode;
};

const Label = ({ label, children }: LabelProps) => {
  return (
    <label htmlFor={label} className={classes.label}>
      {children}
    </label>
  );
};
export default Label;
