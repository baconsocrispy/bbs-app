// library
import { FC, useContext } from 'react';

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
  return (
    <div className='auth-form'>
      AuthForm
    </div>
  )
}

export default AuthForm;