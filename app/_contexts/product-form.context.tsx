'use client'

// library
import { createContext, ReactNode, useState } from "react";

// types
import { Feature, Spec, TextBlock } from "../api/api-types";

type ProductFormOptions = {
  features: Feature[];
  specs: Spec[];
  textBlocks: TextBlock[];
};

type ProductFormContextProps = {
  formOptions: ProductFormOptions;
  addFeature: Function;
  removeFeature: Function;
  updateFeature: Function
};

type ProductFormProviderProps = {
  children: ReactNode;
}

// context
export const ProductFormContext = createContext<ProductFormContextProps>({
  formOptions: {
    features: [],
    specs: [],
    textBlocks: []
  },
  addFeature: () => {},
  removeFeature: () => {},
  updateFeature: () => {}
});

// provider
export const ProductFormProvider = ({ children }: ProductFormProviderProps) => {
  // initial state
  const emptyForm: ProductFormOptions = {
    features: [],
    specs: [],
    textBlocks: []
  };

  const [ formOptions, setFormOptions ] = useState(emptyForm);

  // actions
  const resetForm = () => {
    setFormOptions(emptyForm);
  };

  const addFeature = (feature: Feature) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.features.push(feature);
    setFormOptions(updatedFormOptions);
  };

  const removeFeature = (index: number) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.features[index] = { 
      ...updatedFormOptions.features[index], _destroy: true 
    };
    setFormOptions(updatedFormOptions);
  };

  const updateFeature = (feature: Feature, index: number) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.features[index] = {
      ...feature
    };
    setFormOptions(updatedFormOptions);
  };

  // export data
  const value = {
    formOptions,
    addFeature,
    removeFeature,
    updateFeature,
    resetForm
  };

  return (
    <ProductFormContext.Provider value={ value }>
      { children }
    </ProductFormContext.Provider>
  );
};