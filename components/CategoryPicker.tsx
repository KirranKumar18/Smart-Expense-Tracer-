import { Category, CATEGORY_COLORS, CATEGORY_ICONS } from '@/types/expense';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryPickerProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = Object.values(Category);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.categoryItemSelected,
              { borderColor: CATEGORY_COLORS[category] },
            ]}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{CATEGORY_ICONS[category]}</Text>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#7EA2FF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryItem: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  categoryItemSelected: {
    borderWidth: 3,
    backgroundColor: '#F0F8FF',
  },
  icon: {
    fontSize: 32,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#333',
  },
});
