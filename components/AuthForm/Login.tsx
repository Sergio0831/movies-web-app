import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from 'types/Inputs';
import Form from './Form';
import classes from './AuthForm.module.scss';
import { useEffect } from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Button } from '../ui';
import FormFooter from './FormFooter';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result.error) {
      setError('email', {
        message: result.error
      });
    }

    if (!result.error) {
      router.replace('/');
    }
  };

  const inputClasses = clsx({
    'body-m': true,
    [classes.input]: true
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <Form title='Login' onSubmit={handleSubmit(onSubmit)}>
      <Label label='email'>
        <input
          type='email'
          id='email'
          {...register('email', {
            required: "Can't be empty",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Wrong format'
            }
          })}
          placeholder='Email address'
          className={`${inputClasses} ${errors.email && classes.input__error}`}
        />
        {errors?.email && <ErrorMessage>{errors?.email.message}</ErrorMessage>}
      </Label>
      <Label label='password'>
        <input
          type='password'
          id='password'
          {...register('password', {
            required: "Can't be empty"
          })}
          placeholder='Password'
          className={`${inputClasses} ${
            errors.password && classes.input__error
          }`}
        />
        {errors?.password && (
          <ErrorMessage>{errors?.password.message}</ErrorMessage>
        )}
      </Label>
      <Button type='submit' className='btn-fill'>
        Login to your account
      </Button>
      <FormFooter
        link='signup'
        text="Don't have an account?"
        linkText='Sign Up'
      />
    </Form>
  );
};
export default Login;
