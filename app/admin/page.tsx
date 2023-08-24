'use client'

// library
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// context
import { UserContext } from "../contexts/user.context";

const Admin = () => {
  // state
  const [ loading, setLoading ] = useState(true);
  const { user, userLoading, signOut } = useContext(UserContext);
  const router = useRouter();

  // ensure user is loaded on refresh before checking presence
  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        router.push('/admin/signin');
      } else {
        setLoading(false);
      }  
    }
  }, [ user, userLoading, router ])

  // handlers
  const signOutHandler = () => {
    setLoading(true);
    signOut();
    router.push('/admin/signin');
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