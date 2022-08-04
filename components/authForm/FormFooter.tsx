import Button from '../ui/Button';
import classes from './FormFooter.module.scss';

type FormFooterProps = {
  text: string;
  link: string;
  linkText: string;
};

const FormFooter = ({ link, text, linkText }: FormFooterProps) => {
  return (
    <div className={classes.footer}>
      <p className='body-m'>{text}</p>
      <Button className='body-m btn-outline' type='button' link={link}>
        {linkText}
      </Button>
    </div>
  );
};
export default FormFooter;
