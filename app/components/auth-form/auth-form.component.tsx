'use client'

// library
import { FC, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// context
import { UserContext } from '@/app/contexts/user.context';

// types
export type AuthFormData = {
  grant_type: string,
  client_secret: string,
  client_id: string,
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

        <input
          type='hidden'
          className='auth_form__input'
          { ...register('grant_type', { required: 'Grant type is required' })}
          value='password'
        />

        <input
          type='hidden'
          className='auth_form__input'
          { ...register('client_secret', { required: 'Client secret is required' })}
          value='00ZzPf-afLUxeEtFRPeLYc78GWR3VFX3ZdT05OrhQdA'
        />

        <input
          type='hidden'
          className='auth_form__input'
          { ...register('client_id', { required: 'Client id is required' })}
          value='4tKNC7T2cu01Gy95qJbOas4rUL1xUfdV7-I1rM-5GSw'
        />

        {/* submit button */}
        <button className='auth-form__button'>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default AuthForm;