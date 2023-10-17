// components
import AuthForm from "../../_forms/auth-form/auth-form.component";

// data
import { AUTH_FORM_TYPES } from "../../_forms/auth-form/auth-form.component";

const SignUp = () => {
  return (
    <main className="sign-in-page">
      <h1 className="sign-in-page__header">
        Admin Sign Up
      </h1>
      <AuthForm formType={ AUTH_FORM_TYPES.signup } />
    </main>
  )
}

export default SignUp;