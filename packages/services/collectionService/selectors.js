import { createSelector } from "@reduxjs/toolkit"

const collections = state => state.collectionServiceReducer.collections
const collectionTree = state => state.collectionServiceReducer.collectionTree

export const collectionSelector = createSelector(
  collections,
  items => items
)

export const collectionTreeSelector = createSelector(
  collectionTree,
  items => items
)