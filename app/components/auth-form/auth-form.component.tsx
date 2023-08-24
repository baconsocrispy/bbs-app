'use client'

// library
import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

// context
import { UserContext } from '@/app/contexts/user.context';

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
  const { signIn, updateUser } = useContext(UserContext);
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();

  // destructure useForm elements
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormData>();

  // handlers
  const onSignIn: SubmitHandler<AuthFormData> = async (
    formData: AuthFormData
  ) => {
    setLoading(true);

    const response: Response = await signIn(formData);

    if (response.ok) {
      updateUser()
      router.push('/admin');
    } else {
      setLoading(false);
    } 
  };

  if (loading) return <p>Loading...</p>;

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


    </div>
  )
}

export default AuthForm;