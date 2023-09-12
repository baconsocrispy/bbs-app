'use client'

// library
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// components
import Link from "next/link";

// context
import { UserContext } from "../contexts/user.context";

const Admin = () => {
  // state
  const [ loading, setLoading ] = useState(true);
  const { user, userLoading, signOut } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // wait for user to load on page refresh
    if (!userLoading) {
      // redirect if user not logged in
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

        <div>
          <Link href='/products/new'>New Product</Link>
          <br />
          <Link href='/categories/new'>New Category</Link>
          <br />
          <Link href='/product-groups/new'>New Group</Link>
          <br />
          <Link href='/hero-content/new'>New Hero Content</Link>
        </div>
      </main>
    )
  }
};

export default Admin;