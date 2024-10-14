import { configureStore } from '@reduxjs/toolkit';
import cocktailsReducer from './slices/cocktailsSlice';
import favoritesReducer from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    cocktails: cocktailsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
