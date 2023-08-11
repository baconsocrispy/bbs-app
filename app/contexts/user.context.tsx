'use client'

// library
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

// api
import { getCurrentUser, signInUser } from "../api/auth-api";
import { AuthFormData } from "../components/auth-form/auth-form.component";

// types
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type UserContextProps = {
  jwt: string | null;
  user: User | null;
  signIn: Function;
  setCurrentUser: Function;
};

type UserProviderProps = {
  children: ReactNode;
};

// context
export const UserContext = createContext<UserContextProps>({
  jwt: null,
  user: null,
  signIn: () => {},
  setCurrentUser: () => {}
});

// provider
export const UserProvider = ({ children }: UserProviderProps) => {
  // initial state
  const [ user, setUser ] = useState<User | null>(null);
  const [ jwt, setJWT ] = useState<string | null>(null);
  const router = useRouter();

  // set user when jwt updates
  useEffect(() => {
    jwt && setCurrentUser();
  }, [ jwt ]);

  // actions
  const signIn = async (formData: AuthFormData) => {
    const { jwt } = await signInUser(formData);
    setJWT(jwt);
  };

  const setCurrentUser = async () => {
    if (jwt) {
      const currentUser: User = await getCurrentUser(jwt);
      setUser(currentUser);
      router.push('/admin');
    }
  };

  // data
  const value = {
    jwt,
    user,
    signIn,
    setCurrentUser
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  )
};