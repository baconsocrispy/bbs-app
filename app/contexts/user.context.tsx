'use client'

// library
import { ReactNode, createContext, useEffect, useState } from "react";

// helpers
import { urlEncodeFormData } from "../api/api-helpers";

// api
import { 
  accessTokenFromCredentials, 
  getUserFromAccessToken, 
  revokeAccessToken 
} from "../api/auth-api";

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
  userLoading: boolean;
  signIn: Function;
  signOut: Function;
  signUp: Function;
  updateUser: Function;
};

type UserProviderProps = {
  children: ReactNode;
};

// context
export const UserContext = createContext<UserContextProps>({
  user: null,
  userLoading: false,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  updateUser: () => {},
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
  const signUp = async (formData: AuthFormData) => {
    const encodedData = urlEncodeFormData(formData);
    const response = await fetch('/api/auth', {
      method: 'POST',
      body: encodedData
    })
    return response;
  };

  const signIn = async (formData: AuthFormData) => {
    const response = await accessTokenFromCredentials(formData);
    return response;
  };

  const signOut = async () => {
    await revokeAccessToken();
    setUser(null);
  }

  const updateUser = async () => {
    const currentUser = await getUser();

    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setUserLoading(false);
  };

  // user api call
  const getUser = async (): Promise<User | undefined> => {
    try {
      // api call to /current_user
      const response = await getUserFromAccessToken();

      // throw an error if response is not a success
      if (!response.ok) {
        throw new Error(`User login failed: Status: ${ response.status }`)
      }

      // get user as json from response
      const currentUser: User = await response.json();

      // return user
      return currentUser;
    } catch (error) {
      // log error in console
      console.log(error);
    }
  };

  // data
  const value = {
    user,
    userLoading,
    signIn,
    signOut,
    signUp,
    updateUser
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  )
};