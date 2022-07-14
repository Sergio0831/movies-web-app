import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from 'types/Inputs';
import { Button } from '../ui';
import classes from './AuthForm.module.scss';
import ErrorMessage from './ErrorMessage';
import Form from './Form';
import FormFooter from './FormFooter';
import Label from './Label';

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setFocus,
    getValues,
    reset,
    setError
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, passwordMatch } = data;
    try {
      const response = await axios.post(
        '/api/auth/signup',
        {
          email,
          password,
          passwordMatch
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      router.replace('/');
      reset();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
        setError('email', {
          message: 'User exist!'
        });
      }
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
    <Form title='Sign Up' onSubmit={handleSubmit(onSubmit)}>
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
      <Label label='passwordMatch'>
        <input
          type='password'
          id='passwordMatch'
          {...register('passwordMatch', {
            required: "Can't be empty",
            validate: (value) => {
              const { password } = getValues();
              return password === value || 'Passwords should match!';
            }
          })}
          placeholder='Repeat password'
          className={`${inputClasses} ${
            errors.passwordMatch && classes.input__error
          }`}
        />
        {errors?.passwordMatch && (
          <ErrorMessage>{errors?.passwordMatch.message}</ErrorMessage>
        )}
      </Label>
      <Button type='submit' className='btn-fill'>
        Create an account
      </Button>
      <FormFooter
        link='login'
        text='Already have an account?'
        linkText='Login'
      />
    </Form>
  );
};
export default Signup;
