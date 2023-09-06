
import { createSlice, current } from "@reduxjs/toolkit";


const initialProfileState = {
  firstName: undefined,
  lastName: undefined,
};


const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    getNames(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      console.log(current(state));
    },
  },
});


export const profileActions = profileSlice.actions;

export default profileSlice.reducer;