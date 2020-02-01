import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'
import * as helper from './helper'
import dropRight from "lodash/dropRight"

const modalService = createSlice({
  name: "modal",
  initialState: {
    modals: [],
  },
  reducers: {
    addModal: (state, action) => {
      state.modals = [...state.modals, action.payload]
    },
    removeModal: (state, action) => {
      state.modals = dropRight(state.modals, 1)
    },
  }
})

const { actions, reducer } = modalService
export const {
  addModal,
  removeModal,
} = actions
export { reducer as modalServiceReducer }
export { selectors as modalSelectors }
export { helper as modalHelper }