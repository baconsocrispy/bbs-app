// components
import AuthForm from "../../../_forms/auth-form/auth-form.component";
import Grid from "@/app/_components/grid/grid.component";

const SignUp = () => {
  return (
    <Grid>
      <main className="sign-in-page">
        <h1 className="sign-in-page__header">
          Admin Sign Up
        </h1>
        <AuthForm formType={ 'signup' } />
      </main>
    </Grid>
  )
}

export default SignUp;