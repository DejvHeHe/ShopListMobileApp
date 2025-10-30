import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import isTokenExpired from './functions/isTokenExpired';
import Toast from 'react-native-toast-message';

import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import DashboardPage from './routes/DashboardPage';
import ArchivePage from './routes/ArchivePage';

// ✅ Import ShopListProvider
import { ShopListProvider } from './functions/contexts/shopListContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const expired = await isTokenExpired();
      setInitialRouteName(expired ? 'Login' : 'Dashboard');
    };
    checkToken();
  }, []);

  // Dokud se nezjistí platnost tokenu, nenačítej navigaci (zabrání bliknutí Login → Dashboard)
  if (initialRouteName === null) return null;

  return (
    // ✅ Obalíme celou navigaci providerem
    <ShopListProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Dashboard" component={DashboardPage} />
          <Stack.Screen name="Archive" component={ArchivePage} />
        </Stack.Navigator>

        <Toast />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ShopListProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
