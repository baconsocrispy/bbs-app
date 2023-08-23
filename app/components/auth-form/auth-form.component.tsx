'use client'

// library
import { FC, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// context
import { UserContext } from '@/app/contexts/user.context';

// api
import { signOutUser } from '@/app/api/auth-api';

// types
export type AuthFormData = {
  user: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    passwordConfirmation?: string;
  }
};

const AuthForm: FC = () => {
  // state
  const { signIn } = useContext(UserContext)

  // destructure useForm elements
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthFormData>();

  // handlers
  const onSignIn: SubmitHandler<AuthFormData> = (formData: AuthFormData) => {
    console.log('auth-form')
    signIn(formData);
    reset();
  };

  const signOutHandler = async () => {
    const response = await signOutUser();
    console.log(response);
  }

  return (
    <div className='auth-form'>
      <form
        id='user'
        className='auth-form__form'
        onSubmit={ handleSubmit(onSignIn) }
      >
        {/* email */}
        <label
          htmlFor='email'
          className='auth-form__label'
        >
          Email
        </label>
        <input
          type='email'
          className='auth-form__input'
          { ...register('user.email', { required: 'Email is required'})}
          autoComplete='email'
        />

        {/* password */}
        <label
          htmlFor='password'
          className='auth-form__label'
        >
          Password
        </label>
        <input
          type='password'
          className='auth-form__input'
          { ...register('user.password', { required: 'Password is required'})}
          autoComplete='password'
        />

        {/* submit button */}
        <button className='auth-form__button'>
          Sign In
        </button>
      </form>

      <button onClick={ signOutHandler }>Log Out</button>
    </div>
  )
}

export default AuthForm;