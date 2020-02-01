import { createSelector } from "@reduxjs/toolkit"

const search = state => state.searchServiceReducer.search

export const searchSelector = createSelector(
  search,
  items => items
)