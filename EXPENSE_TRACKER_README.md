# 💰 Expense Tracker App

A fully functional mobile expense tracking application built with React Native and Expo.

## ✨ Features

- ✅ **Add Expenses** - Track expenses with amount, description, category, and date
- ✅ **Dashboard** - View total spending and spending breakdown by category
- ✅ **Expense List** - See all expenses with filtering by category
- ✅ **Delete Expenses** - Remove expenses with confirmation
- ✅ **Persistent Storage** - Data saved locally using AsyncStorage
- ✅ **7 Categories** - Food, Transport, Shopping, Bills, Entertainment, Health, Other
- ✅ **Clean UI** - Modern, intuitive interface with color-coded categories
- ✅ **Form Validation** - Ensures valid expense data entry

## 📱 Screenshots

The app has 3 main tabs:

1. **Home** - Dashboard with spending summary and recent expenses
2. **Add** - Form to add new expenses
3. **Expenses** - Full list of all expenses with category filters

## 🚀 Running the App

The app is already running! The Expo server is active.

### On Android Emulator

1. Make sure you have an Android emulator running (see Android Studio AVD Manager)
2. In the terminal where Expo is running, press **`a`** to open Android
3. The app will install and launch automatically

### On Physical Device

1. Install **Expo Go** app from Play Store (Android) or App Store (iOS)
2. Scan the QR code shown in the terminal
3. The app will load on your device

### On Web Browser

1. Press **`w`** in the terminal to open in web browser
2. App will open at http://localhost:8081

## 🛠️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **AsyncStorage** - Local data persistence
- **Context API** - State management
- **Expo Router** - File-based navigation

## 📂 Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home/Dashboard screen
│   │   ├── add-expense.tsx    # Add expense form
│   │   ├── expenses.tsx       # All expenses list
│   │   └── _layout.tsx        # Tab navigation
│   └── _layout.tsx            # Root layout with providers
├── components/
│   ├── Button.tsx             # Reusable button component
│   ├── Input.tsx              # Reusable input component
│   ├── CategoryPicker.tsx     # Category selector
│   └── ExpenseCard.tsx        # Expense item display
├── context/
│   └── ExpenseContext.tsx     # Global expense state
├── types/
│   └── expense.ts             # TypeScript types
└── utils/
    └── storage.ts             # AsyncStorage operations
```

## 🎨 Categories

Each category has a unique color and icon:

- 🍔 Food - Red
- 🚗 Transport - Teal
- 🛍️ Shopping - Blue
- 📄 Bills - Orange
- 🎬 Entertainment - Green
- ⚕️ Health - Yellow
- 📦 Other - Gray

## 📝 Usage Tips

1. **Adding Expenses**: Go to "Add" tab, fill in amount, description, select category, and tap "Add Expense"
2. **Viewing Summary**: The "Home" tab shows your total spending and breakdown by category
3. **Managing Expenses**: Go to "Expenses" tab to see all expenses, filter by category, or delete items
4. **Data Persistence**: All data is saved automatically and persists between app restarts

## 🔧 Development Commands

```bash
# Start development server
npm start

# Start on specific platform
npx expo start --android
npx expo start --ios
npx expo start --web

# Clear cache and restart
npx expo start -c
```

## 📦 Dependencies

- `expo` - Expo SDK
- `expo-router` - File-based navigation
- `react-native` - React Native framework
- `@react-native-async-storage/async-storage` - Local storage
- `typescript` - Type checking

## 🐛 Troubleshooting

**App not loading on Android?**

- Make sure emulator is running
- Try pressing `r` in terminal to reload
- Clear cache: `npx expo start -c`

**Changes not showing?**

- Press `r` in the terminal to reload
- Shake device/emulator and press "Reload"

**AsyncStorage errors?**

- Make sure AsyncStorage is installed: `npm install @react-native-async-storage/async-storage`

## 🎯 Future Enhancements

Potential features to add:

- 📊 Charts and graphs for spending visualization
- 💰 Budget limits and warnings
- 📅 Date range filtering
- 📤 Export to CSV
- 🔄 Income tracking
- 🌍 Multi-currency support
- ☁️ Cloud sync

## 👨‍💻 Author

Built with ❤️ using React Native and Expo

---

**Enjoy tracking your expenses!** 💰
