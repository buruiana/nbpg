import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const collectionService = createSlice({
  name: 'collection',
  initialState: {
    collection: [],
    collectionTree: [],
  },
  reducers: {
    getCollections: () => {},
    setCollections: (state, action) => {
      state.collections = action.payload
    },
    setCollectionTree: (state, action) => {
      state.collectionTree = action.payload
    },
    getCollectionTree: () => {},
  }
})

const { actions, reducer } = collectionService
export const {
  getCollections,
  setCollections,
  setCollectionTree,
  getCollectionTree,
} = actions
export { reducer as collectionServiceReducer }
export { selectors as collectionSelectors}

