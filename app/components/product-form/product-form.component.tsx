'use client'

// library
import { 
  ChangeEventHandler, 
  FC, 
  MouseEventHandler,
  useEffect, 
  useState
} from "react";

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
import { 
  Feature, 
  Group, 
  Product, 
  Spec, 
  TextBlock 
} from "@/app/api/api-types";

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
    setLoading(true);

    // format form data for fetch request
    const encodedData = encodeProductFormData(formData, defaultImage, images);

    try {
      product ? 
        await updateProduct(product.slug, encodedData) :
        await createProduct(encodedData)
      router.push('/');
    } catch {
      // setLoading(false);
      console.log(loading)
    }
  };

  const handleDeleteProduct: MouseEventHandler = async (e) => {
    // prevent form submit
    e.preventDefault();

    if (product) {
      await deleteProduct(product.slug);
      router.push('/');
    }
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

  if (loading) return <p>Loading...</p>;

  return (
    <form 
      id="product"
      className="product-form"
      onSubmit={ handleSubmit(submitHandler) }
    >
      <section className="product-form__section">
        <h2 className="product-form__sub-header">General</h2>
        {/* product name */}
        <label 
          className="product-form__label"
          htmlFor="product-name"
        >
          Name*
        </label>
        <input
          id="product-name" 
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
          htmlFor="product-short-description"
        >
          Description
        </label>
        <textarea
          id="product-short-description"
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
          Default Image*
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
        <label 
          className="product-form__label"
          htmlFor="group-select"
        >
          product group*
        </label>
        <select
          id="group-select"
          className="product-form__input"
          { ...register('product.group_id') }
        >
          { groups?.map((group) => 
            <option key={ group.id } value={ group.id }>
              { group.name }
            </option>
          )}
        </select>
      </section>

      <SpecsGroup 
        productSpecs={ product?.specs }
        register={ register }
      />
      
      <FeaturesGroup 
        productFeatures={ product?.features }
        register={ register }
      />

      <TextBlockGroup
        productTextBlocks={ product?.textBlocks }
        register={ register }
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