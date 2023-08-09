// library
import { ReactNode, createContext, useEffect, useState } from "react";

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
  setCurrentUser: Function;
};

type UserProviderProps = {
  children: ReactNode;
};

// context
export const UserContext = createContext<UserContextProps>({
  jwt: null,
  user: null,
  setCurrentUser: () => {}
});

// provider
export const UserProvider = ({ children }: UserProviderProps) => {
  // initial state
  const [ user, setUser ] = useState<User | null>(null);
  const [ jwt, setJWT ] = useState<string | null>(null);

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
    }
  };

  // data
  const value = {
    jwt,
    user,
    setCurrentUser
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  )
};