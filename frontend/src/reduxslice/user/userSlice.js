import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentuser : null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user' ,
    initialState,
    reducers: {
      signinstart: (state) => {
        state.loading = true;
        state.error = null;
      },
      signinsuccess: (state, action) => {
        state.currentuser = action.payload;
        state.loading = false;
        state.error = null;
      },
      signinfailure: (state, action) => {
        state.currentuser = null;
        state.loading = false;
        state.error = action.payload;
      },
      signoutSuccess: (state) => {
        state.currentuser = null;
        state.error = null;
        state.loading = false;
      },
      signupfailure: (state, action) => {
        state.currentuser = null;
        state.error = action.payload;
        state.loading = false;
      },
    }
  });
  

export const {signinfailure, signinsuccess, signinstart, signoutSuccess, signupfailure} = userSlice.actions

export default userSlice.reducer