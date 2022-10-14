import { combineReducers } from "redux";
import albums from "./albums";
import photos from "./photos";
import users from "./users";

export default combineReducers({
  users,
  albums,
  photos,
});
