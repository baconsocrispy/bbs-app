'use client'

// library
import { ReactNode, createContext, useEffect, useState } from "react";

// api
import { 
  accessTokenFromCredentials, 
  getUserFromAccessToken, 
  revokeAccessToken 
} from "../api/auth-api";

// types
import { AuthFormData } from "../components/auth-form/auth-form.component";

export type User = {
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
    const response = await accessTokenFromCredentials(formData);
    return response;
  };

  const signOut = async () => {
    await revokeAccessToken();
    setUser(null);
  }

  const getUser = async () => {
    try {
      const currentUser: User = await getUserFromAccessToken();
      setUser(currentUser);
      return true;
    } catch (error) {
      console.log(error)
      return false;
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