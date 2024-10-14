import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../../../utils/theme';

const FilterSelector = ({ title, items, selectedItem, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.item,
            selectedItem === item && styles.selectedItem,
          ]}
          onPress={() => onSelect(item)}
        >
          <Text 
            style={[
              styles.itemText,
              selectedItem === item && styles.selectedItemText,
            ]}
            numberOfLines={1}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.small,
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: spacing.medium,
    marginBottom: spacing.small,
  },
  scrollContent: {
    paddingHorizontal: spacing.medium,
  },
  item: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
    marginRight: spacing.small,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  selectedItem: {
    backgroundColor: colors.primary,
  },
  itemText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
  },
  selectedItemText: {
    color: colors.white,
  },
});

export default FilterSelector;
