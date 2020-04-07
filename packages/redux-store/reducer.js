import {
  backendServiceReducer,
  codeGenServiceReducer,
  collectionServiceReducer,
  loginServiceReducer,
  modalServiceReducer,
  projectServiceReducer,
  searchServiceReducer,
} from "@bpgen/services";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  backendServiceReducer,
  collectionServiceReducer,
  modalServiceReducer,
  searchServiceReducer,
  projectServiceReducer,
  codeGenServiceReducer,
  loginServiceReducer,
});

export default rootReducer;
