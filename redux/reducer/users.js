import {
  FETCH_ALL
} from "../actionTypes";
export const users = (user = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    default:
      return user;
  }
};
