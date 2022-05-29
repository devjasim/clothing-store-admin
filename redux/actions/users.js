import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE_USER,
  DASHBOARD
} from "../actionTypes";

// Action creator
export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    
    dispatch({ type: FETCH_ALL, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

// Action creator
export const getDashboard = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDashboard();
    
    dispatch({ type: DASHBOARD, payload: data.result });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = (id, post, basicNonStickyNotification) => async (dispatch) => {
  try {
    await api.updateUser(id, post).then(res => {
      basicNonStickyNotification.current.showToast();
      dispatch({ type: UPDATE, payload: res.data.result });
    });
    
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id, basicNonStickyNotification) => async (dispatch) => {
  try {
    await api.deleteUser(id).then(res => {
      basicNonStickyNotification.current.showToast();
    });
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.log(error);
  }
};
