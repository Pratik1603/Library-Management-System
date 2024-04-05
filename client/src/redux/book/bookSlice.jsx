import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: null,
  error: null,
  loading: false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    bookFetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    bookFetchSuccess: (state, action)=>{
      state.books = action.payload;
      // console.log(state.currentUser);
      state.loading = false;
      state.error = null;
    },
    bookFetchFailure: (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletebookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletebookSuccess: (state) => {
      state.books= null;
      state.loading = false;
      state.error = null;
    },
    deletebookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  bookFetchStart,
  bookFetchSuccess,
  bookFetchFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deletebookStart,
  deletebookSuccess,
  deletebookFailure,
  
} = bookSlice.actions;

export default bookSlice.reducer;