import { createSlice } from '@reduxjs/toolkit';

const dogsSlice = createSlice({
  name: 'dogs',
  initialState: {
    allDogs: [],
    searchResults: [],
    currentPage: 1, 
    dogsPerPage: 8,
    filters: {
      origin: '',
      createdInDb: '',
    },
    sortOptions: {
      field: '',
      order: '',
    },
  },

  reducers: {
    setAllDogs: (state, action) => {
      state.allDogs = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    filterDogs: (state, action) => {
  const origin = action.payload.origin;
  const allDogs = state.allDogs;
  const filteredDogs = origin === 'API' ? allDogs.filter(dog => !dog.createdInDb) : allDogs.filter(dog => dog.createdInDb);
  state.searchResults = filteredDogs;
  state.currentPage = 1;
    },
    sortDogs: (state, action) => {
  const field = action.payload.field;
  const order = action.payload.order;
  const searchResults = state.searchResults;
  searchResults.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    if (aValue < bValue) {
      return order === 'ASC' ? -1 : 1;
    } else if (aValue > bValue) {
      return order === 'ASC' ? 1 : -1;
    } else {
      return 0;
    }
    })
    state.searchResults = searchResults;
    state.currentPage = 1;
  },
}})

export const getAllDogs = (state) => state.dogs.allDogs

export const { setAllDogs, setSearchResults, setCurrentPage, filterDogs, sortDogs } = dogsSlice.actions;

export default dogsSlice.reducer;