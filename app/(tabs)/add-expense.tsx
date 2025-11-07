import { Button } from '@/components/Button';
import { CategoryPicker } from '@/components/CategoryPicker';
import { Input } from '@/components/Input';
import { useExpenses } from '@/context/ExpenseContext';
import { Category } from '@/types/expense';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function AddExpenseScreen() {
  const { addExpense } = useExpenses();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.FOOD);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{ amount?: string; description?: string }>({});

  const validateForm = () => {
    const newErrors: { amount?: string; description?: string } = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExpense = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await addExpense({
        amount: parseFloat(amount),
        description: description.trim(),
        category,
        date: date,
      });

      // Reset form
      setAmount('');
      setDescription('');
      setCategory(Category.FOOD);
      setDate(new Date().toISOString().split('T')[0]);
      setErrors({});

      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Expense</Text>
            <Text style={styles.headerSubtitle}>Track a new expense</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Amount (₹)"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              error={errors.amount}
            />

            <Input
              label="Description"
              placeholder="e.g., Grocery shopping"
              value={description}
              onChangeText={setDescription}
              error={errors.description}
            />

            <Input
              label="Date"
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
            />

            <CategoryPicker
              selectedCategory={category}
              onSelectCategory={setCategory}
            />

            <Button
              title="Add Expense"
              onPress={handleAddExpense}
              style={styles.addButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    padding: 20,
    paddingTop: 0,
  },
  addButton: {
    marginTop: 8,
  },
});
