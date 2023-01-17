import {
    FETCH_PRODUCTS,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    CREATE_PRODUCT
  } from "../actionTypes";

  export const products = (products = [], action) => {
    switch (action.type) {
      case FETCH_PRODUCTS:
        return action.payload;
  
      case CREATE_PRODUCT:
        return [...products, action.payload]
  
      case DELETE_PRODUCT:
        return products.filter((item) => item._id !== action.payload);
  
      case UPDATE_PRODUCT:
        return products.map((item) => item._id === action.payload._id ? action.payload : item);
        
      default:
        return products;
    }
  };
  