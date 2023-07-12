import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

// state = {} represents the initial state
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }; // When the request is being made loading is true
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }; // When the request succeeds, payload(products data) is passed
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }; // If there is any error we pass error instead of products in the payload
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state /* ,product: []*/ }; // When the request is being made loading is true
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }; // When the request succeeds, payload(products data) is passed
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }; // If there is any error we pass error instead of products in the payload
    default:
      return state;
  }
};
