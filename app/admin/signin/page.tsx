// components
import AuthForm from "../../components/auth-form/auth-form.component";

const SignIn = () => {
  return (
    <main className="sign-in-page">
      <h1 className="sign-in-page__header">
        Admin Sign In
      </h1>
      <AuthForm />
    </main>
  )
}

export default SignIn;