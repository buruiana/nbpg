import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'

const searchService = createSlice({
  name: 'search',
  initialState: {
    search: {},
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
  }
})

const { actions, reducer } = searchService
export const { setSearch } = actions
export { reducer as searchServiceReducer }
export { selectors as searchSelectors }
