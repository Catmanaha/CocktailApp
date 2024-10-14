import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@cocktail_favorites';

export const saveFavorites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
  } catch (error) {
    console.error(error);
  }
};

export const loadFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
