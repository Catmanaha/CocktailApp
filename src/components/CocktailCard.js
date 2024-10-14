import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../utils/theme';

const CocktailCard = ({ cocktail, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
    <Text style={styles.title}>{cocktail.strDrink}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.medium,
    marginHorizontal: spacing.medium,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.text,
    padding: spacing.medium,
  },
});

export default CocktailCard;
