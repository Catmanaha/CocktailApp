import { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CocktailCard from '../../components/CocktailCard';
import { loadFavoritesFromStorage } from '../../redux/slices/favoritesSlice';
import { colors, spacing, fontSizes } from '../../utils/theme';

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: favorites, status, error } = useSelector(state => state.favorites);

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);

  if (status === 'loading') {
    return <Text style={styles.message}>Loading favorites...</Text>;
  }

  if (status === 'failed') {
    return <Text style={styles.message}>Error: {error}</Text>;
  }

  if (favorites.length === 0) {
    return <Text style={styles.message}>No favorites added yet.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <CocktailCard 
            cocktail={item} 
            onPress={() => navigation.navigate('Details', { cocktail: item })}
          />
        )}
        keyExtractor={item => item.idDrink}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingVertical: spacing.medium,
  },
  message: {
    fontSize: fontSizes.medium,
    textAlign: 'center',
    marginTop: spacing.large,
    color: colors.text,
  },
});

export default Favorites;
