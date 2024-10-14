import { useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCocktails, 
  fetchCategories, 
  fetchAlcoholFilters, 
  fetchGlassTypes, 
  fetchRandomCocktail,
  setSelectedCategory,
  setSelectedAlcohol,
  setSelectedGlass,
  setSearchQuery
} from '../../redux/slices/cocktailsSlice';
import SearchBar from './components/SearchBar';
import FilterSelector from './components/FilterSelector';
import RandomButton from './components/RandomButton';
import CocktailCard from '../../components/CocktailCard';
import { colors, spacing, fontSizes } from '../../utils/theme';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { 
    cocktails, 
    categories, 
    alcoholFilters, 
    glassTypes, 
    status, 
    selectedCategory,
    selectedAlcohol,
    selectedGlass,
    searchQuery
  } = useSelector(state => state.cocktails);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAlcoholFilters());
    dispatch(fetchGlassTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCocktails({ 
      search: searchQuery, 
      category: selectedCategory, 
      alcohol: selectedAlcohol, 
      glass: selectedGlass 
    }));
  }, [dispatch, searchQuery, selectedCategory, selectedAlcohol, selectedGlass]);

  const handleSearch = useCallback((query) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);

  const handleCategorySelect = useCallback((category) => {
    dispatch(setSelectedCategory(category));
  }, [dispatch]);

  const handleAlcoholSelect = useCallback((alcohol) => {
    dispatch(setSelectedAlcohol(alcohol));
  }, [dispatch]);

  const handleGlassSelect = useCallback((glass) => {
    dispatch(setSelectedGlass(glass));
  }, [dispatch]);

  const handleRandomCocktail = useCallback(() => {
    dispatch(fetchRandomCocktail()).then((action) => {
      if (action.payload) {
        navigation.navigate('Details', { cocktail: action.payload });
      }
    });
  }, [dispatch, navigation]);

  const renderHeader = useCallback(() => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Cocktail App</Text>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} />
        <RandomButton onPress={handleRandomCocktail} />
      </View>
      <View style={styles.filtersContainer}>
        <FilterSelector 
          title="Category"
          items={categories} 
          selectedItem={selectedCategory} 
          onSelect={handleCategorySelect} 
        />
        <FilterSelector 
          title="Alcohol"
          items={alcoholFilters} 
          selectedItem={selectedAlcohol} 
          onSelect={handleAlcoholSelect} 
        />
        <FilterSelector 
          title="Glass"
          items={glassTypes} 
          selectedItem={selectedGlass} 
          onSelect={handleGlassSelect} 
        />
      </View>
    </>
  ), [
    categories, 
    alcoholFilters, 
    glassTypes, 
    selectedCategory, 
    selectedAlcohol, 
    selectedGlass, 
    handleRandomCocktail,
    handleSearch,
    handleCategorySelect,
    handleAlcoholSelect,
    handleGlassSelect
  ]);

  if (status === 'loading' && cocktails.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlashList
        data={cocktails}
        renderItem={({ item }) => (
          <CocktailCard 
            cocktail={item} 
            onPress={() => navigation.navigate('Details', { cocktail: item })}
          />
        )}
        estimatedItemSize={100}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => <Text style={styles.emptyText}>No cocktails found</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    backgroundColor: colors.background,
  },
  filtersContainer: {
    paddingVertical: spacing.medium,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.large,
    fontSize: fontSizes.medium,
    color: colors.textLight,
  },
});

export default Home;
