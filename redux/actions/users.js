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

export const updateUser = (id, post, updateNotification, setUpdateMessage, setButtonModalPreview) => async(dispatch) => {
  try {
    await api.updateUser(id, post).then(res => {
      updateNotification.current.showToast();
      setUpdateMessage("User update successfully")
      setButtonModalPreview(false)
      dispatch({ type: UPDATE, payload: res.data.result });
      if(res.data.result?.roles === "admin") {
        localStorage.setItem("profile", JSON.stringify(res.data.result));
      }
    }).catch(err => {
      updateNotification.current.showToast();
      setUpdateMessage(err?.response?.data?.message)
    });
    
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id, deleteNotification, setDelteMessage) => async (dispatch) => {
  try {
    await api.deleteUser(id).then(res => {
      setDelteMessage("User deleted successfully")
      deleteNotification.current.showToast();
    });
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    setDelteMessage("User delete failed")
    deleteNotification.current.showToast();
    console.log(error);
  }
};

export const createUser = (formData, showNotification, setNotification, setCreateUserModal) => async (dispatch) => {
  try {
    await api.createUser(formData).then(res => {
      setNotification("User created successfully");
      showNotification.current.showToast();
      setCreateUserModal(false);
      dispatch({type: CREATE, payload: res?.data?.result});
    }).catch((err) => {
      setNotification(err.response.data?.message)
      showNotification.current.showToast();
    });

  } catch (error) {
    console.log(error)
  }
}
