import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  issues: null,
  error: null,
  loading: false,
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    issueFetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    issueFetchSuccess: (state, action)=>{
      state.issues = action.payload;
      // console.log(state.currentUser);
      state.loading = false;
      state.error = null;
    },
    issueFetchFailure: (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.issues = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteissueStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteissueSuccess: (state) => {
      state.issues= null;
      state.loading = false;
      state.error = null;
    },
    deleteissueFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  issueFetchStart,
  issueFetchSuccess,
  issueFetchFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteissueStart,
  deleteissueSuccess,
  deleteissueFailure,
  
} = issueSlice.actions;

export default issueSlice.reducer;