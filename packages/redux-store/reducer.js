import {
  backendServiceReducer,
  collectionServiceReducer,
  modalServiceReducer,
  searchServiceReducer,
  projectServiceReducer,
  codeGenServiceReducer,
} from '@bpgen/services'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  backendServiceReducer,
  collectionServiceReducer,
  modalServiceReducer,
  searchServiceReducer,
  projectServiceReducer,
  codeGenServiceReducer,
})

export default rootReducer