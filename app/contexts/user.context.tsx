// library
import { ReactNode, createContext, useEffect, useState } from "react";

// types
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

type UserContextProps = {
  jwt: string | null;
  user: User | null;
  getUser: Function;
}

type UserProviderProps = {
  children: ReactNode;
}

// user
export const UserContext = createContext<UserContextProps>({
  jwt: null,
  user: null,
  getUser: () => {}
});

// provider
export const UserProvider = ({ children }: UserProviderProps) => {
  // initial state
  const [ user, setUser ] = useState<User | null>(null);
  const [ jwt, setJWT ] = useState<string | null>(null);

  // set user when jwt updates
  useEffect(() => {
    jwt && getUser();
  }, [ jwt ]);

  // actions
  const getUser = async () => {
    if (jwt) {
      const currentUser: User = await getCurrentUser(jwt);
      setUser(currentUser);
    }
  };

  // data export
  const value = {
    jwt,
    user,
    getUser
  };

  return (
    <UserContext.Provider value= { value }>
      { children }
    </UserContext.Provider>
  )
}