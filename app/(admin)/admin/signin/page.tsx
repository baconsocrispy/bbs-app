// components
import AuthForm from "../../../_forms/auth-form/auth-form.component";
import Grid from "@/app/_components/grid/grid.component";

const SignIn = () => {
  return (
    <Grid>
      <main className="sign-in-page">
        <h1 className="sign-in-page__header">
          Admin Sign In
        </h1>
        <AuthForm />
      </main>
    </Grid>
  )
}

export default SignIn;