import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from './dogsReducer'

const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    // Agrega otros reducers aquí si los necesitas
  },
});

export default store;