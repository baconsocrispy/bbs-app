// components
import AuthForm from "../../components/auth-form/auth-form.component";

// data
import { AUTH_FORM_TYPES } from "@/app/api/api-data";

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