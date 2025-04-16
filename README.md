# 🍔 FoodieX

🎥 **[Watch Demo Video](https://drive.google.com/file/d/13BZSnLsttbBfy5wFUjsly0bJD2enJ6ZJ/view)**

FoodieX is a modern, beautiful, and highly responsive React Native food ordering app, packed with sleek animations, persistent state management, and an intuitive user experience.

---

## 🚀 Features

- Blur effects for immersive UI
- Bottom tab navigation with native stack integration
- Redux Toolkit for global state management
- Persisted storage with `redux-persist` and `react-native-mmkv`
- Lottie animations for smooth transitions
- Responsive font sizing and layout scaling
- Unique components like animated numbers and rolling bars
- Gradient backgrounds and modern design elements

---

## 🛠️ Tech Stack & Dependencies

| Library                          | Version     | Description                                  |
|----------------------------------|-------------|----------------------------------------------|
| `react-native`                  | 0.78.1      | Base framework for mobile development        |
| `@react-navigation/native`      | ^7.0.17     | Navigation core                              |
| `@react-navigation/bottom-tabs` | ^7.3.1      | Bottom tab navigation                        |
| `@react-navigation/native-stack`| ^7.3.1      | Native stack screens                         |
| `@reduxjs/toolkit`              | ^2.6.1      | Redux simplified                             |
| `react-redux`                   | ^9.2.0      | React bindings for Redux                     |
| `redux-persist`                 | ^6.0.0      | Persist and rehydrate Redux state            |
| `react-native-mmkv`             | ^2.12.2     | High-performance storage                     |
| `axios`                         | ^1.8.4      | API requests                                 |
| `lodash.isequal`               | ^4.5.0      | Deep comparison                              |
| `uuid`                          | ^11.1.0     | Unique IDs                                   |
| `react-native-vector-icons`     | ^10.2.0     | Icons support                                |
| `react-native-safe-area-context`| ^5.3.0      | Safe area padding                            |
| `react-native-screens`          | ^4.9.2      | Navigation performance                       |
| `react-native-gesture-handler`  | ^2.24.0     | Gesture support                              |
| `react-native-reanimated`       | ^3.17.1     | Animations                                   |
| `lottie-react-native`           | ^7.2.2      | Lottie support                               |
| `react-native-animated-numbers` | ^0.6.3      | Animated number transitions                  |
| `react-native-unistyles`        | ^2.31.0     | Responsive styles                            |
| `react-native-responsive-fontsize`| ^0.5.1    | Font scaling                                 |
| `react-native-linear-gradient`  | ^2.8.3      | Gradients                                    |
| `react-native-rolling-bar`      | ^1.0.0      | Custom rolling progress bar                  |
| `react-native-svg`              | ^15.11.2    | SVG support                                  |
| `react-native-svg-transformer`  | ^1.5.0      | Transformer for SVGs                         |
| `@react-native-community/blur`  | ^4.4.1      | Blur views                                   |
| `react-native-get-random-values`| ^1.11.0     | Polyfill for UUID generation                 |

---

## 📦 Scripts

| Command               | Description                           |
|-----------------------|---------------------------------------|
| `npm run android`     | Run app on Android                    |
| `npm run ios`         | Run app on iOS                        |
| `npm run start`       | Start Metro bundler                   |
| `npm run lint`        | Run ESLint                            |
| `npm run test`        | Run Jest tests                        |
| `npm run pod-install` | iOS pods install (New Architecture)   |
| `npm run postinstall` | Patch packages post install           |
| `npm run generate-apk`| Generate release APK for Android      |

---

## 📱 Installation & Setup

```bash
git clone https://github.com/your-username/FoodieX.git
cd FoodieX

# Install dependencies
npm install

# Run iOS pods (if on macOS)
npm run pod-install

# Start app
npm run android
# or
npm run ios
