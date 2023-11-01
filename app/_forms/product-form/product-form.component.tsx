'use client'

// library
import { 
  ChangeEventHandler, 
  FC, 
  MouseEventHandler,
  useContext,
  useEffect, 
  useState
} from "react";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

// context
import { ProductFormContext } from "@/app/_contexts/product-form.context";

// components
import FeaturesGroup from "../nested-groups/features-group/features-group.component";
import GroupsGroup from "../nested-groups/groups-group/groups-group.component";
import SpecsGroup from "../nested-groups/specs-group/specs-group.component";
import TextBlockGroup from "../nested-groups/text-block-group/text-block-group.component";

// helpers
import { encodeProductFormData } from "../form-helpers";

// types
import { 
  Feature, 
  Group, 
  Product, 
  ProductGrouping, 
  Spec, 
  TextBlock 
} from "@/app/api/api-types";

export type ProductFormData = {
  product: {
    features_attributes: Feature[];
    product_groupings_attributes: ProductGrouping[];
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
  const [ defaultImage, setDefaultImage ] = useState<File | undefined>(undefined);
  const [ groups, setGroups ] = useState<Group[] | undefined>(undefined);
  const [ highlight, setHighlight ] = useState(product?.highlight)
  const [ images, setImages ] = useState<FileList | undefined>(undefined);
  const [ name, setName ] = useState(product?.name);
  const [ shortDescription, setShortDescription ] = useState(product?.short_description);
  const { formOptions, addFeature, addSpec } = useContext(ProductFormContext);
  
  // loading state
  const [ loading, setLoading ] = useState(true);

  // navigation
  const router = useRouter();

  // useForm elements
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>();

  // load groups
  useEffect(() => {
    const getGroups = async () => {
      const response = await fetch('/api/groups');
      const { groups }: { groups: Group[] } = await response.json();
      setGroups(groups);
    };
    groups ? setLoading(false) : getGroups();
  }, [ groups ]);

  // set form options
  useEffect(() => {
    if (!product) return;
    product.features.map((feature) => addFeature(feature));
    product.specs.map((spec) => addSpec(spec));
  }, [])

  // handlers
  const submitHandler: SubmitHandler<ProductFormData> = async (
    formData: ProductFormData
  ) => {
    setLoading(true);

    // format form data for fetch request
    const encodedData = encodeProductFormData(formData, defaultImage, images);

    try {
      if (product) { 
        const response = await fetch(`/api/products/${ product.slug }`, {
          credentials: 'include',
          method: 'PUT',
          body: encodedData
        });
      } else { 
        const response = await fetch('/api/products', {
          credentials: 'include',
          method: 'POST',
          body: encodedData
        });
      }
      router.push('/');
    } catch (error) {
      setLoading(false);
      console.error('Something went wrong:', error);
    }
  };

  const handleDeleteProduct: MouseEventHandler = async (e) => {
    // prevent form submit
    e.preventDefault();

    if (product) {
      const response = await fetch(`/api/products/${ product.slug }`, {
        method: 'DELETE'
      });
      router.push('/');
    }
  };

  const defaultImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files ? 
      setDefaultImage(e.target.files[0]) :
      setDefaultImage(undefined)
  };

  const imagesChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files ?
      setImages(e.target.files) :
      setImages(undefined)
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

        {/* product highlight */}
        <label 
          className="product-form__label"
          htmlFor="product-highlight"
        >
          Highlight
        </label>
        <input
          id="product-highlight" 
          className="product-form__input"
          type="text"
          autoComplete="false"
          name="product[highlight]"
          value={ highlight }
          onChange={ (e) => setHighlight(e.target.value) }
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
      </section>

      { groups && 
        <GroupsGroup 
          groups={ groups }
          productGroupings={ product?.productGroupings }
          register={ register }
          setValue={ setValue }
        /> 
      }

      <SpecsGroup 
        productSpecs={ formOptions.specs }
        register={ register }
      />
      
      <FeaturesGroup 
        productFeatures={ formOptions.features }
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