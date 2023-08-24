'use client'

// library
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// context
import { UserContext } from "../contexts/user.context";

const Admin = () => {
  // state
  const [ loading, setLoading ] = useState(true);
  const { user, getUser, signOut } = useContext(UserContext);
  const router = useRouter();

  // check login state on page refresh
  useEffect(() => {
    if (!user) {
      setLoading(true);

      const updateUser = async () => {
        const response: boolean = await getUser();

        if (!response) {
          router.push('/admin/signin');
        } else {
          setLoading(false);
        }
      };

      updateUser();
    }

    setLoading(false);
  }, [ user, getUser, router ])

  // handlers
  const signOutHandler = async () => {
    await signOut();
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <main>
        <div>
          <h3>Hello { user?.first_name }</h3>
          <button onClick={ signOutHandler }>Log Out</button>
        </div>
      </main>
    )
  }
};

export default Admin;