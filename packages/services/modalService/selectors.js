import { createSelector } from '@reduxjs/toolkit'

const modals = state => state.modalServiceReducer.modals

export const modalSelector = createSelector(
  modals,
  items => items
)
