'use client'

// library
import { ReactNode, createContext, useEffect, useState } from "react";

// api
import { getCurrentUser, signInUser, signOutUser } from "../api/auth-api";

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
  signOut: Function;
  getUser: Function;
};

type UserProviderProps = {
  children: ReactNode;
};

// context
export const UserContext = createContext<UserContextProps>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  getUser: () => {}
});

// provider
export const UserProvider = ({ children }: UserProviderProps) => {
  // initial state
  const [ user, setUser ] = useState<User | null>(null);

  // load user on page refresh
  useEffect(() => {
    getUser();
  }, []);

  // actions
  const signIn = async (formData: AuthFormData) => {
    await signInUser(formData);
  };

  const signOut = async () => {
    if (!user) return;
    await signOutUser();
    setUser(null);
  }

  const getUser = async () => {
    try {
      const currentUser: User = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log(error)
    }
  };

  // data
  const value = {
    user,
    signIn,
    signOut,
    getUser
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  )
};