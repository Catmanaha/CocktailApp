import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../../../utils/theme';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search cocktails..."
        placeholderTextColor={colors.textLight}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: spacing.small,
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
    fontSize: fontSizes.medium,
    color: colors.text,
  },
});

export default SearchBar;
