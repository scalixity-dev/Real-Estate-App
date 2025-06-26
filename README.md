# Construction Management App

A React Native application for managing construction sites, tasks, and resources.

## Features

- Multi-role support (SuperAdmin, Supervisor, Procurement, Accountant)
- Site management and progress tracking
- Task assignment and monitoring
- Material request and procurement workflow
- Budget tracking and billing management
- Analytics and reporting

## Prerequisites

- Node.js (v14.17 or higher)
- npm (v8.19.4 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up Android development environment:

a. Install Android Studio:
   - Download from https://developer.android.com/studio
   - During installation, make sure to select:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device
   - Complete the installation and launch Android Studio

b. Configure Android SDK:
   - Open Android Studio
   - Go to Settings/Preferences > Appearance & Behavior > System Settings > Android SDK
   - In the SDK Platforms tab, select:
     - Android 13 (API Level 33)
     - Android 12 (API Level 31)
   - In the SDK Tools tab, select:
     - Android SDK Build-Tools
     - Android SDK Command-line Tools
     - Android Emulator
     - Android SDK Platform-Tools

c. Set up environment variables:
   - Run the provided setup script:
```bash
./setup-android.ps1
```
   - Restart your terminal after running the script

3. Start the development server:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

5. Run on iOS (macOS only):
```bash
npm run ios
```

## Project Structure

```
RealEstate/
├── src/
│   ├── navigation/    # Navigation configuration
│   ├── screens/       # Screen components
│   ├── store/         # Redux store and slices
│   ├── types/         # TypeScript type definitions
│   └── components/    # Reusable components
├── assets/            # Images and other static files
└── App.tsx           # Root component
```

## Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run the app on Android
- `npm run ios`: Run the app on iOS
- `npm run web`: Run the app in a web browser

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details
