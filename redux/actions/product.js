import * as api from "../api";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS
} from "../actionTypes";

export const createProduct = (formData, showNotification, setNotification) => async (dispatch) => {
    try {
      await api.createProduct(formData).then(res => {
        setNotification("Product created successfully");
        showNotification.current.showToast();
        dispatch({type: CREATE_PRODUCT, payload: res?.data?.result});
      }).catch((err) => {
        setNotification(err.response.data?.message)
        showNotification.current.showToast();
      });
  
    } catch (error) {
      console.log(error)
    }
}

export const getProducts = () => async (dispatch) => {
    try {
      await api.getProducts().then(res => {
        dispatch({type: FETCH_PRODUCTS, payload: res?.data});
      }).catch((err) => {
        console.log("ERR", err);
      });
  
    } catch (error) {
      console.log(error)
    }
}

export const deleteProduct = (showNotification, setNotification) => async (dispatch) => {
    try {
    await api.deleteUser(id).then(res => {
        setNotification("Product deleted successfully")
        showNotification.current.showToast();
    });
    dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (error) {
    setNotification("Product delete failed")
    showNotification.current.showToast();
    console.log(error);
    }
}