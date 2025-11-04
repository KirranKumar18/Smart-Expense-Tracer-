export enum Category {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  SHOPPING = 'Shopping',
  BILLS = 'Bills',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  OTHER = 'Other',
}

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string; // ISO string format
  createdAt: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.FOOD]: '#FF6B6B',
  [Category.TRANSPORT]: '#4ECDC4',
  [Category.SHOPPING]: '#45B7D1',
  [Category.BILLS]: '#FFA07A',
  [Category.ENTERTAINMENT]: '#98D8C8',
  [Category.HEALTH]: '#F7DC6F',
  [Category.OTHER]: '#B8B8B8',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.FOOD]: '🍔',
  [Category.TRANSPORT]: '🚗',
  [Category.SHOPPING]: '🛍️',
  [Category.BILLS]: '📄',
  [Category.ENTERTAINMENT]: '🎬',
  [Category.HEALTH]: '⚕️',
  [Category.OTHER]: '📦',
};
