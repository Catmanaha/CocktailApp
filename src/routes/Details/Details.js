import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import FavoriteButton from './components/FavoriteButton';
import { colors, fontSizes, spacing } from '../../utils/theme';

const Details = ({ route }) => {
  const { cocktail } = route.params;

  const ingredients = Object.keys(cocktail)
    .filter(key => key.startsWith('strIngredient') && cocktail[key])
    .map(key => cocktail[key]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{cocktail.strDrink}</Text>
        <Text style={styles.category}>{cocktail.strCategory}</Text>
        <FavoriteButton cocktail={cocktail} />
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
        ))}
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: spacing.medium,
  },
  title: {
    fontSize: fontSizes.xlarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.small,
  },
  category: {
    fontSize: fontSizes.medium,
    color: colors.textLight,
    marginBottom: spacing.medium,
  },
  sectionTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.large,
    marginBottom: spacing.small,
  },
  ingredient: {
    fontSize: fontSizes.medium,
    color: colors.text,
    marginLeft: spacing.medium,
    marginBottom: spacing.small,
  },
  instructions: {
    fontSize: fontSizes.medium,
    color: colors.text,
    lineHeight: 24,
  },
});

export default Details;
