import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import classes from './AuthForm.module.scss';

const AuthForm: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [matchPwd, setMatchPwd] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className='heading-l'>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <label htmlFor='email'>
        <input
          className='body-m'
          type='email'
          id='email'
          value={email}
          placeholder='Email address'
          required
          autoComplete='off'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </label>
      <label htmlFor='pwd'>
        <input
          className='body-m'
          type='password'
          id='pwd'
          value={pwd}
          placeholder='Password'
          required
          autoComplete='off'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPwd(e.target.value)
          }
        />
      </label>
      {!isLogin && (
        <label htmlFor='matchPwd'>
          <input
            className='body-m'
            type='password'
            id='matchPwd'
            value={matchPwd}
            placeholder='Repeat password'
            required
            autoComplete='off'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMatchPwd(e.target.value)
            }
          />
        </label>
      )}
      <button type='submit' className='body-m btn-block btn-fill'>
        {isLogin ? 'Login to your account' : 'Create an account'}
      </button>
      <div className={classes.form__bottom}>
        <p className='body-m'>
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
        </p>
        <button
          className='body-m btn-outline'
          type='button'
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </form>
  );
};
export default AuthForm;
