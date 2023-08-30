// types
import { ProductFormData } from "../components/product-form/product-form.component";

// helpers
import { 
  backendFormEncodedRequest,
  backendUrlEncodedRequest, 
  baseApiUrl 
} from "./api-helpers"

export const getAllProducts = async () => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/products`
  );
  return response;
};

export const getProduct = async (id: number) => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl( )}/v1/products/${ id }`
  );
  return response;
};

export const createProduct = async(data: ProductFormData) => {
  const response = await backendFormEncodedRequest(
    'POST', `${ baseApiUrl() }/v1/products`, data
  );
  return response;
};