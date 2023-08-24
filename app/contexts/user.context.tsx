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
  updateUser: Function;
  userLoading: boolean;
};

type UserProviderProps = {
  children: ReactNode;
};

// context
export const UserContext = createContext<UserContextProps>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  getUser: () => {},
  updateUser: () => {},
  userLoading: false
});

// provider
export const UserProvider = ({ children }: UserProviderProps) => {
  // initial state
  const [ user, setUser ] = useState<User | null>(null);
  const [ userLoading, setUserLoading ] = useState(true);

  // load user on page refresh
  useEffect(() => {
    updateUser();
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

  const getUser = async (): Promise<User | undefined> => {
    try {
      // api call to /current_user
      const response = await getUserFromAccessToken();

      // throw error if there's a problem
      if (!response.ok) {
        throw new Error(`User login failed: Status: ${ response.status }`)
      }

      // get user from json response
      const currentUser: User = await response.json();

      return currentUser;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    const currentUser = await getUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setUserLoading(false);
  };

  // data
  const value = {
    user,
    signIn,
    signOut,
    getUser,
    updateUser,
    userLoading
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  )
};