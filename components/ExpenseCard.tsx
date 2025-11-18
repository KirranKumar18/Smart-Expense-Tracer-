import { colors } from '@/constants/colors';
import { CATEGORY_COLORS, CATEGORY_ICONS, Expense } from '@/types/expense';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExpenseCardProps {
  expense: Expense;
  onDelete?: (id: string) => void;
  onPress?: () => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onDelete, onPress }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: CATEGORY_COLORS[expense.category] + '20' },
          ]}
        >
          <Text style={styles.icon}>{CATEGORY_ICONS[expense.category]}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.description} numberOfLines={1}>
            {expense.description}
          </Text>
          <Text style={styles.category}>{expense.category}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>₹{expense.amount.toFixed(2)}</Text>
        {onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(expense.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card_bg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC3545',
    marginBottom: 4,
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    fontSize: 18,
  },
});
