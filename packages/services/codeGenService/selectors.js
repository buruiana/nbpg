import { createSelector } from '@reduxjs/toolkit'

const code = state => state.codeGenServiceReducer.code

export const codeGenSelector = createSelector(
  code,
  items => items
)
