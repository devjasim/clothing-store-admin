import { combineReducers } from "redux";
import auth from "./auth";
import { users } from './users';
import { dashboard } from "./dashboard";
import { products } from "./product";

export default combineReducers({
  auth,
  users,
  dashboard,
  products
});
