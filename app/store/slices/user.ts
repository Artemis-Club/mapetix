import { createSlice } from "@reduxjs/toolkit";

export const appUserSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = appUserSlice.actions;
export default appUserSlice.reducer;
