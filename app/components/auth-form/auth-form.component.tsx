'use client'

// library
import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

// context
import { UserContext } from '@/app/contexts/user.context';

// data
import { AUTH_FORM_TYPES } from '@/app/api/api-data';

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

type AuthFormProps = {
  formType?: string;
};

const AuthForm: FC<AuthFormProps> = ({ 
  formType = AUTH_FORM_TYPES.signin 
}) => {
  // state
  const { signIn, signUp, updateUser } = useContext(UserContext);
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();

  // destructure useForm elements
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthFormData>();

  // handlers
  const onSignIn: SubmitHandler<AuthFormData> = async (
    formData: AuthFormData
  ) => {
    setLoading(true);

    const response: Response = await signIn(formData);

    if (response.ok) {
      await updateUser();
      router.push('/admin');
    } else {
      setLoading(false);
    } 
  };

  const onSignUp: SubmitHandler<AuthFormData> = async (
    formData: AuthFormData
  ) => {
    setLoading(true);

    const response: Response = await signUp(formData);

    if (response.ok) {
      const user = await response.json();
      console.log(user);
      router.push('/admin');
    } else {
      // reset();
      setLoading(false);
    }
  };

  if (loading) return <p>Signing in...</p>;

  return (
    <div className='auth-form'>
      <form
        id='user'
        className='auth-form__form'
        onSubmit={ formType === AUTH_FORM_TYPES.signup ? 
          handleSubmit(onSignUp) :
          handleSubmit(onSignIn) 
        }
      >
      
        {/* first name */}
        { formType === AUTH_FORM_TYPES.signup && 
          <>
            <label
              htmlFor='first-name'
              className='auth-form__label'
            >
              First Name
            </label>
            <input
              id="first-name"
              type='text'
              className='auth-form__input'
              { ...register('user.firstName', { required: 'First name is required'})}
              autoComplete='off'
            />
          </>
        }

        {/* last name */}
        { formType === AUTH_FORM_TYPES.signup && 
          <>
            <label
              htmlFor='last-name'
              className='auth-form__label'
            >
              Last Name
            </label>
            <input
              id="last-name"
              type='text'
              className='auth-form__input'
              { ...register('user.lastName', { required: 'Last name is required'})}
              autoComplete='off'
            />
          </>
        }

        {/* email */}
        <label
          htmlFor='email'
          className='auth-form__label'
        >
          Email
        </label>
        <input
          id="email"
          type='email'
          className='auth-form__input'
          { ...register('user.email', { required: 'Email is required'})}
          autoComplete={ AUTH_FORM_TYPES.signup ? 'off' : 'email' }
        />

        {/* password */}
        <label
          htmlFor='password'
          className='auth-form__label'
        >
          Password
        </label>
        <input
          id="password"
          type='password'
          className='auth-form__input'
          { ...register('user.password', { required: 'Password is required'})}
          autoComplete={ AUTH_FORM_TYPES.signup ? 'off' : 'password' }
        />

        {/* password confirmation */}
        { formType === AUTH_FORM_TYPES.signup && 
          <>
            <label
              htmlFor='password-confirmation'
              className='auth-form__label'
            >
              Password Confirmation
            </label>
            <input
              id="password-confirmation"
              type='password'
              className='auth-form__input'
              { ...register('user.passwordConfirmation', { required: 'Password confirmation is required'})}
              autoComplete='off'
            />
          </>
        }

        {/* submit button */}
        <button className='auth-form__button'>
          { AUTH_FORM_TYPES.signup ? 'Sign Up' : 'Sign In' }
        </button>
      </form>
    </div>
  )
}

export default AuthForm;