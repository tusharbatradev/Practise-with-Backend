import { createSlice } from "@reduxjs/toolkit";
import { useGetDataQuery } from "./apiSlice";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
