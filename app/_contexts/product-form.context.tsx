// library
import { createContext, ReactNode, useState } from "react";

// types
import {  } from "../api/api-types";

type ProductFormContextProps = {

};

type ProductFormProviderProps = {
  children: ReactNode;
}

// context
export const ProductFormContext = createContext<ProductFormContextProps>({});

// provider
export const ProductFormProvider = ({ children }: ProductFormProviderProps) => {
  // initial state
  const emptyForm = {};

  const [ formOptions, setFormOptions ] = useState(emptyForm);

  // actions
  const resetForm = () => {
    setFormOptions(emptyForm);
  };

  // export data
  const value = {
    formOptions,
    resetForm
  };

  return (
    <ProductFormContext.Provider value={ value }>
      { children }
    </ProductFormContext.Provider>
  );
};