import { createSelector } from "@reduxjs/toolkit";

const authenticated = (state) => state.loginServiceReducer.authenticated;

export const loginSelector = createSelector(authenticated, (items) => items);
