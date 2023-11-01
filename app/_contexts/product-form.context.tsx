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
  updateFeature: Function;
  addSpec: Function;
  removeSpec: Function;
  updateSpec: Function;
  addTextBlock: Function;
  removeTextBlock: Function;
  updateTextBlock: Function;
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
  updateFeature: () => {},
  addSpec: () => {},
  removeSpec: () => {},
  updateSpec: () => {},
  addTextBlock: () => {},
  removeTextBlock: () => {},
  updateTextBlock: () => {}
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

  const addSpec = (spec: Spec) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.specs.push(spec);
    setFormOptions(updatedFormOptions);
  };

  const removeSpec = (index: number) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.specs[index] = { 
      ...updatedFormOptions.specs[index], _destroy: true 
    };
    setFormOptions(updatedFormOptions);
  };

  const updateSpec = (spec: Spec, index: number) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.specs[index] = {
      ...spec
    };
    setFormOptions(updatedFormOptions);
  };

  const addTextBlock = (textBlock: TextBlock) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.textBlocks.push(textBlock);
    setFormOptions(updatedFormOptions);
  };

  const removeTextBlock = (index: number) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.textBlocks[index] = { 
      ...updatedFormOptions.textBlocks[index], _destroy: true 
    };
    setFormOptions(updatedFormOptions);
  };

  const updateTextBlock = (textBlock: TextBlock, index: number) => {
    const updatedFormOptions = { ...formOptions };
    updatedFormOptions.textBlocks[index] = {
      ...textBlock
    };
    setFormOptions(updatedFormOptions);
  };

  // export data
  const value = {
    formOptions,
    addFeature,
    removeFeature,
    updateFeature,
    addSpec,
    removeSpec,
    updateSpec,
    addTextBlock,
    removeTextBlock,
    updateTextBlock,
    resetForm
  };

  return (
    <ProductFormContext.Provider value={ value }>
      { children }
    </ProductFormContext.Provider>
  );
};