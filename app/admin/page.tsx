'use client'

// library
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

// context
import { UserContext } from "../contexts/user.context";

// api
import { createProduct } from "../api/products-api";

// types
export type ProductFormData = {
  product: {
    name: string;
    short_description: string;
    product_images: File[]; 
  }
}

const Admin = () => {
  // state
  const [ loading, setLoading ] = useState(true);
  const { user, userLoading, signOut } = useContext(UserContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormData>();

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

  const submitHandler:SubmitHandler<ProductFormData> = async (
    formData: ProductFormData
  ) => {
    const response = await createProduct(formData);
    const product = await response.json();
    console.log(product)
  }

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <main>
        <div>
          <h3>Hello { user?.first_name }</h3>
          <button onClick={ signOutHandler }>Log Out</button>

          <form 
            id="product"
            encType="multipart/form-data"
            onSubmit={ handleSubmit(submitHandler)}
          >

            <label htmlFor="name">Name</label>
            <input 
              type="text"
              { ...register('product.name')} 
            />

            <label htmlFor="short-description">Description</label>
            <input 
              type="text"
              { ...register('product.short_description')} 
            />

            <label htmlFor="product_images">Image</label>
            <input 
              type="file"
              { ...register('product.product_images')} 
              multiple
            />

            <button type='submit'>Submit</button>
          </form>
        </div>
      </main>
    )
  }
};

export default Admin;