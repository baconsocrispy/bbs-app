'use client'

// library
import { useContext } from "react";

// components
import AuthForm from "../../components/auth-form/auth-form.component";

// context
import { UserContext } from "@/app/contexts/user.context";

const SignIn = () => {
  // state
  const { user } = useContext(UserContext);

  return (
    <main>
      <div>
        <h4>{ user ? user.first_name : 'No user' }</h4>
      </div>
      <AuthForm />
    </main>
  )
}

export default SignIn;