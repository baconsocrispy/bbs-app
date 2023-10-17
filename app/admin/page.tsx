'use client'

// library
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// components
import Link from "next/link";

// context
import { UserContext } from "../_contexts/user.context";

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
      <main className="admin-page">
        <div>
          <h3>Hello { user?.first_name }</h3>
          
        </div>

        <div className="admin-page__links">
          <Link 
            className="admin-page__link"
            href='/products/new'
          >
            New Product
          </Link>
          <Link 
            className="admin-page__link"
            href='/categories/new'
          >
            New Category
          </Link>
          <Link
            className="admin-page__link" 
            href='/product-groups/new'
          >
            New Group
          </Link>
          <Link
            className="admin-page__link"
            href='/hero-content/edit'
          >
            Edit Homepage
          </Link>
          <Link
            className="admin-page__link"
            href='/admin/signup'
          >
            Add User
          </Link>
        </div>

        <button 
          className="admin-page__logout"
          onClick={ signOutHandler }
        >
          Log Out
        </button>
      </main>
    )
  }
};

export default Admin;