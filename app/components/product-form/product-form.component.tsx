'use client'

// library
import { FC, useState, useEffect, ChangeEventHandler, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

// components
import FeaturesGroup from "../features-group/features-group.component";
import SpecsGroup from "../specs-group/specs-group.component";
import TextBlockGroup from "../text-block-group/text-block-group.component";

// api
import { 
  createProduct,
  deleteProduct,
  encodeProductFormData, 
  updateProduct 
} from "../../api/products-api";

import { getAllGroups } from "@/app/api/groups-api";

// types
import { Feature, Group, Product, Spec, TextBlock } from "@/app/api/api-types";

export type ProductFormData = {
  product: {
    features_attributes: Feature[];
    group_id: number;
    name: string;
    short_description: string;
    specs_attributes: Spec[];
    text_blocks_attributes: TextBlock[];
  }
};

type ProductFormProps = {
  product?: Product;
};

const ProductForm: FC<ProductFormProps> = ({ product }) => {
  // form state
  const [ defaultImage, setDefaultImage ] = useState<File | null>(null);
  const [ groups, setCategories ] = useState<Group[] | null>(null);
  const [ images, setImages ] = useState<FileList | null>(null);
  const [ name, setName ] = useState(product ? product.name : '');
  const [ shortDescription, setShortDescription ] = useState(product ? product.short_description : '');
  
  // loading state
  const [ loading, setLoading ] = useState(true);

  // navigation
  const router = useRouter();

  // useForm elements
  const {
    handleSubmit,
    register,
    unregister,
    formState: { errors }
  } = useForm<ProductFormData>();

  // load groups
  useEffect(() => {
    const getGroups = async () => {
      const groups = await getAllGroups();
      setCategories(groups);
    };
    groups ? setLoading(false) : getGroups();
  }, [ groups ]);

  // handlers
  const submitHandler: SubmitHandler<ProductFormData> = async (formData: ProductFormData) => {
    const encodedData = encodeProductFormData(formData, defaultImage, images);
    product ? 
      await updateProduct(product.slug, encodedData) :
      await createProduct(encodedData)
    router.push('/');
  };

  const defaultImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files ? 
      setDefaultImage(e.target.files[0]) :
      setDefaultImage(null)
  };

  const imagesChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files ?
      setImages(e.target.files) :
      setImages(null)
  };

  const handleDeleteProduct: MouseEventHandler = async (e) => {
    e.preventDefault();
    if (product) {
      await deleteProduct(product.slug);
      router.push('/');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form 
      id="product"
      className="product-form"
      onSubmit={ handleSubmit(submitHandler) }
    >
      <section className="product-form__section">
        {/* product name */}
        <label 
          className="product-form__label"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name" 
          className="product-form__input"
          type="text"
          autoComplete="false"
          { ...register('product.name') }
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />

        {/* product description */}
        <label
          className="product-form__label" 
          htmlFor="short-description"
        >
          Description
        </label>
        <textarea
          id="short-description"
          className="product-form__textarea" 
          { ...register('product.short_description')}
          value={ shortDescription }
          onChange={ (e) => setShortDescription(e.target.value) }
        />

        {/* product default image */}
        <label 
          className="product-form__label"
          htmlFor="product-default-image"
        >
          Default Image
        </label>
        <input 
          id="product-default-image"
          className="product-form__attach-button"
          type="file"
          name="product[default_image]"
          onChange={ defaultImageChange }
        />

        {/* product images */}
        <label 
          className="product-form__label"
          htmlFor="product-images"
        >
          Images
        </label>
        <input 
          id="product-images"
          className="product-form__attach-button"
          type="file"
          name="product[product_images][]"
          multiple
          onChange={ imagesChange }
        />

        {/* group id */}
        <label htmlFor="group-select">
          Product Group
        </label>
        <select
          id="group-select"
          className="product-form__select"
          { ...register('product.group_id') }
        >
          { groups?.map((group) => 
            <option key={ group.id } value={ group.id }>
              { group.name }
            </option>
          )}
        </select>
      </section>
      
      <FeaturesGroup 
        productFeatures={ product?.features }
        register={ register }
        unregister={ unregister }
      />

      <SpecsGroup 
        productSpecs={ product?.specs }
        register={ register }
        unregister={ unregister }
      />

      <TextBlockGroup
        productTextBlocks={ product?.textBlocks }
        register={ register }
        unregister={ unregister }
      />



      {/* submit button */}
      <button 
        className="product-form__button"
        type='submit'
      >
        Submit
      </button>
      { product &&
        <button 
          className="product-form__button"
          type='submit'
          onClick={ handleDeleteProduct }
        >
          Delete Product
        </button>
      }
    </form>
  )
};

export default ProductForm;