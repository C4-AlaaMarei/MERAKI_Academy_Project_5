/** @format */

import { combineReducers, createStore } from "redux";
import cartReducer from "./cart/index";
import itemsReducer from "./item/index";
import loginReducer from "./login/index";
import itemInfoReducer from "./itemInfo/index";
import wishlistReducer from "./wishlist/index";
import usersReducer from "./users/index";
import serviceReducer from "./service/index";
import workerReducer from "./worker";
const reducers = combineReducers({
  itemsReducer,
  loginReducer,
  cartReducer,
  itemInfoReducer,
  wishlistReducer,
  usersReducer,
  // serviceReducer,
  workerReducer,
});

const store = createStore(reducers);

export default store;
