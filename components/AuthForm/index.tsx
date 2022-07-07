import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import classes from './AuthForm.module.scss';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const AuthForm: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [matchPwd, setMatchPwd] = useState<string>('');
  const [errorMsg, setErrMsg] = useState<string>('');
  const [matchEmailMsg, setMatchEmailMsg] = useState<string>('');
  const [matchPwdMsg, setMatchPwdMsg] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !pwd || (!isLogin && !matchPwd)) {
      setErrMsg("Can't be empty");
      setInputError(true);
    } else if (!isLogin && pwd !== matchPwd) {
      setMatchPwdMsg('Passwords must match');
    } else if (!EMAIL_REGEX.test(email)) {
      setMatchEmailMsg('Wrong format');
    } else {
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setErrMsg('');
      setMatchPwdMsg('');
      setInputError(false);
      console.log(email, pwd, matchPwd);
    }
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isLogin && pwd !== matchPwd) {
      setMatchPwdMsg('Passwords must match');
    }
  }, [isLogin, pwd, matchPwd]);

  useEffect(() => {
    if (!EMAIL_REGEX.test(email)) {
      setMatchEmailMsg('Wrong format');
    }
  }, [email]);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className='heading-l'>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <label htmlFor='email'>
        <input
          ref={emailRef}
          className={`body-m ${classes.input} ${
            (!email || !EMAIL_REGEX.test(email)) &&
            inputError &&
            classes.input__error
          }`}
          type='text'
          id='email'
          value={email}
          placeholder='Email address'
          autoComplete='off'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <p
          className={`body-s ${classes.error}
           ${(!email || !EMAIL_REGEX.test(email)) && classes.error__show}`}
          ref={errRef}
          aria-live='assertive'
        >
          {!email ? errorMsg : !EMAIL_REGEX.test(email) && matchEmailMsg}
        </p>
      </label>
      <label htmlFor='pwd'>
        <input
          className={`body-m ${classes.input} ${
            !pwd && inputError && classes.input__error
          }`}
          type='password'
          id='pwd'
          value={pwd}
          placeholder='Password'
          autoComplete='off'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPwd(e.target.value)
          }
        />
        <p
          className={`body-s ${classes.error}
           ${!pwd && classes.error__show}`}
          ref={errRef}
          aria-live='assertive'
        >
          {errorMsg}
        </p>
      </label>
      {!isLogin && (
        <label htmlFor='matchPwd'>
          <input
            className={`body-m ${classes.input} ${
              ((!matchPwd && inputError) || (pwd !== matchPwd && !isLogin)) &&
              classes.input__error
            }`}
            type='password'
            id='matchPwd'
            value={matchPwd}
            placeholder='Repeat password'
            autoComplete='off'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMatchPwd(e.target.value)
            }
          />
          <p
            className={`body-s ${classes.error}
           ${
             (!matchPwd || (pwd !== matchPwd && !isLogin)) &&
             classes.error__show
           }`}
            ref={errRef}
            aria-live='assertive'
          >
            {pwd !== matchPwd && !isLogin
              ? matchPwdMsg
              : !matchPwd && !isLogin && errorMsg}
          </p>
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
