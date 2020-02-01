import { createSlice } from '@reduxjs/toolkit'

const backendService = createSlice({
  name: "backend",
  initialState: {},
  reducers: {
    prettifyCode: (state, action) => { },
    createItem: (state, action) => {},
    readItem: (state, action) => {},
    updateItem: (state, action) => {},
    deleteItem: (state, action) => {},
    setItem: (state, action) => {
      state.collections = action.payload
    },
  }
})

const { actions, reducer } = backendService
export const {
  prettifyCode,
  createItem,
  readItem,
  updateItem,
  deleteItem,
  setItem
} = actions
export { reducer as backendServiceReducer }

