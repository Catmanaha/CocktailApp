import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, fontSizes, spacing } from '../../../utils/theme';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => (
  <View style={styles.container}>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.category,
            selectedCategory === category && styles.selectedCategory,
          ]}
          onPress={() => onSelect(category)}
        >
          <Text 
            style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText,
            ]}
            numberOfLines={1}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: spacing.small,
  },
  scrollContent: {
    paddingHorizontal: spacing.medium,
  },
  category: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
    marginRight: spacing.small,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: colors.white,
  },
});

export default CategoryFilter;
