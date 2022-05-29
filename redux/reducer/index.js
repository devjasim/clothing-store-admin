import { combineReducers } from "redux";
import auth from "./auth";
import { users } from './users';
import { dashboard } from "./dashboard";

export default combineReducers({
  auth,
  users,
  dashboard
});
