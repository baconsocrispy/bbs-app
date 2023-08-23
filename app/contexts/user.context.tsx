'use client'

// library
import { ReactNode, createContext, useEffect, useState } from "react";

// api
import { getCurrentUser, signInUser } from "../api/auth-api";

// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

type User = {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
};

type UserContextProps = {
  user: User | null;
  signIn: Function;
};

type UserProviderProps = {
  children: ReactNode;
};

// context
export const UserContext = createContext<UserContextProps>({
  user: null,
  signIn: () => {},
});

// provider
export const UserProvider = ({ children }: UserProviderProps) => {
  // initial state
  const [ user, setUser ] = useState<User | null>(null);

  // 
  useEffect(() => {
    getUser();
  }, []);

  // actions
  const signIn = async (formData: AuthFormData) => {
    const response = await signInUser(formData);
  };

  const getUser = async () => {
    const currentUser: User = await getCurrentUser();
    setUser(currentUser);
  };

  // data
  const value = {
    user,
    signIn
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  )
};