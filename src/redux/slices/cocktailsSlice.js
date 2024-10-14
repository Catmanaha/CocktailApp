import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../networking/apiClient';

export const fetchCocktails = createAsyncThunk(
  'cocktails/fetchCocktails',
  async ({ search = '', category = '', alcohol = '', glass = '' }) => {
    let url = '/filter.php?';
    if (search) url = `/search.php?s=${search}`;
    else if (category && category !== 'All') url += `c=${category}`;
    else if (alcohol && alcohol !== 'All') url += `a=${alcohol}`;
    else if (glass && glass !== 'All') url += `g=${glass}`;
    else url = '/search.php?f=a'; 

    const response = await apiClient.get(url);
    return response.data.drinks || [];
  }
);

export const fetchCategories = createAsyncThunk(
  'cocktails/fetchCategories',
  async () => {
    const response = await apiClient.get('/list.php?c=list');
    return ['All', ...(response.data.drinks?.map(category => category.strCategory) || [])];
  }
);

export const fetchAlcoholFilters = createAsyncThunk(
  'cocktails/fetchAlcoholFilters',
  async () => {
    const response = await apiClient.get('/list.php?a=list');
    return ['All', ...(response.data.drinks?.map(item => item.strAlcoholic) || [])];
  }
);

export const fetchGlassTypes = createAsyncThunk(
  'cocktails/fetchGlassTypes',
  async () => {
    const response = await apiClient.get('/list.php?g=list');
    return ['All', ...(response.data.drinks?.map(item => item.strGlass) || [])];
  }
);

export const fetchRandomCocktail = createAsyncThunk(
  'cocktails/fetchRandomCocktail',
  async () => {
    const response = await apiClient.get('/random.php');
    return response.data.drinks?.[0] || null;
  }
);

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: {
    cocktails: [],
    categories: [],
    alcoholFilters: [],
    glassTypes: [],
    status: 'idle',
    error: null,
    selectedCategory: 'All',
    selectedAlcohol: 'All',
    selectedGlass: 'All',
    searchQuery: '',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedAlcohol = 'All';
      state.selectedGlass = 'All';
      state.searchQuery = '';
    },
    setSelectedAlcohol: (state, action) => {
      state.selectedAlcohol = action.payload;
      state.selectedCategory = 'All';
      state.selectedGlass = 'All';
      state.searchQuery = '';
    },
    setSelectedGlass: (state, action) => {
      state.selectedGlass = action.payload;
      state.selectedCategory = 'All';
      state.selectedAlcohol = 'All';
      state.searchQuery = '';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.selectedCategory = 'All';
      state.selectedAlcohol = 'All';
      state.selectedGlass = 'All';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cocktails = action.payload;
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchAlcoholFilters.fulfilled, (state, action) => {
        state.alcoholFilters = action.payload;
      })
      .addCase(fetchGlassTypes.fulfilled, (state, action) => {
        state.glassTypes = action.payload;
      });
  },
});

export const { 
  setSelectedCategory, 
  setSelectedAlcohol, 
  setSelectedGlass,
  setSearchQuery
} = cocktailsSlice.actions;

export default cocktailsSlice.reducer;
