import { Expense } from '@/types/expense';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expense_tracker_expenses';

export const storageService = {
  async getExpenses(): Promise<Expense[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading expenses:', error);
      return [];
    }
  },

  async saveExpenses(expenses: Expense[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  },

  async addExpense(expense: Expense): Promise<void> {
    try {
      const expenses = await this.getExpenses();
      expenses.push(expense);
      await this.saveExpenses(expenses);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  },

  async deleteExpense(id: string): Promise<void> {
    try {
      const expenses = await this.getExpenses();
      const filtered = expenses.filter((exp) => exp.id !== id);
      await this.saveExpenses(filtered);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  },

  async updateExpense(updatedExpense: Expense): Promise<void> {
    try {
      const expenses = await this.getExpenses();
      const index = expenses.findIndex((exp) => exp.id === updatedExpense.id);
      if (index !== -1) {
        expenses[index] = updatedExpense;
        await this.saveExpenses(expenses);
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  },

  async clearAllExpenses(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing expenses:', error);
    }
  },
};
