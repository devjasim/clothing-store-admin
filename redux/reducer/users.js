import {
  FETCH_ALL,
  DELETE_USER,
  UPDATE,
  CREATE
} from "../actionTypes";
export const users = (user = [], action) => {
  console.log("SUER", user)
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...user, action.payload]

    case DELETE_USER:
      return user.filter((item) => item._id !== action.payload);

    case UPDATE:
      return user.map((item) => item._id === action.payload._id ? action.payload : item);
      
    default:
      return user;
  }
};
