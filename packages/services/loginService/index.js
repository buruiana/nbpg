import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./selectors";

const loginService = createSlice({
  name: "backend",
  initialState: {
    authenticated: false,
  },
  reducers: {
    signin: (state, action) => {
      console.log("########## action", action);
      if (
        (action.payload.username === "admin") &
        (action.payload.password === "xxx")
      ) {
        state.authenticated = true;
      }
    },
    signout: (state, action) => {
      state.authenticated = false;
    },
  },
});

const { actions, reducer } = loginService;
export const { signin, signout } = actions;
export { reducer as loginServiceReducer };
export { selectors as loginSelectors };
