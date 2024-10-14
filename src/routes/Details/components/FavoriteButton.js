import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../redux/slices/favoritesSlice';

const FavoriteButton = ({ cocktail }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(cocktail));
    } else {
      dispatch(addFavorite(cocktail));
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
      <Text style={styles.buttonText}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FavoriteButton;
