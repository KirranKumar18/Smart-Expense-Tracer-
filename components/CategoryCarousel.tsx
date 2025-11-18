import { colors } from '@/constants/colors';
import { Category, CATEGORY_COLORS, CATEGORY_ICONS } from '@/types/expense';
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';

interface CategoryCarouselProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.6;
const SPACING = 16;

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = Object.values(Category);
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(
    categories.indexOf(selectedCategory)
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setActiveIndex(index);
    if (categories[index]) {
      onSelectCategory(categories[index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      >
        {categories.map((category, index) => {
          const isSelected = category === selectedCategory;
          
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryCard,
                {
                  width: ITEM_WIDTH,
                  marginLeft: index === 0 ? SPACING : SPACING / 2,
                  marginRight:
                    index === categories.length - 1 ? SPACING : SPACING / 2,
                },
              ]}
              onPress={() => onSelectCategory(category)}
              activeOpacity={0.9}
            >
              <Animated.View
                style={[
                  styles.cardInner,
                  {
                    backgroundColor: isSelected
                      ? CATEGORY_COLORS[category]
                      : colors.card_bg,
                    borderColor: CATEGORY_COLORS[category],
                    borderWidth: isSelected ? 0 : 2,
                  },
                ]}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{CATEGORY_ICONS[category]}</Text>
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? colors.primary_text : '#333' },
                  ]}
                >
                  {category}
                </Text>
                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {categories.map((category, index) => (
          <View
            key={category}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex
                    ? CATEGORY_COLORS[category]
                    : '#D1D5DB',
                width: index === activeIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#7EA2FF',
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  categoryCard: {
    height: 180,
  },
  cardInner: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 64,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary_text,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
