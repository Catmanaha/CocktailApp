import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveFavorites, loadFavorites } from '../../utils/asyncStorage';

export const loadFavoritesFromStorage = createAsyncThunk(
  'favorites/loadFavoritesFromStorage',
  async () => {
    const favorites = await loadFavorites();
    return favorites;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
      saveFavorites(state.items);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.idDrink !== action.payload.idDrink);
      saveFavorites(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoritesFromStorage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadFavoritesFromStorage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadFavoritesFromStorage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
