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
import MockLoginPage from './routes/MockLoginPage';

import { UserIdProvider } from './functions/contexts/userIdContext';
import { ListFunctionProvider } from './functions/contexts/listFunctionContext';
import { ShopListProvider } from './functions/contexts/shopListContext';
import { SharedShopListProvider } from './functions/contexts/sharedShopListContext';
import { MemberListProvider } from './functions/contexts/memberListContext';
import { ArchivedShopListProvider } from './functions/contexts/listArchivedContext'; 

import { isMock } from './IS_MOCK';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (isMock) {
        setInitialRouteName('MockLogin');
        return;
      }

      const expired = await isTokenExpired();
      setInitialRouteName(expired ? 'Login' : 'Dashboard');
    };

    init();
  }, []);


  if (initialRouteName === null) return null;

  return (
    <UserIdProvider>
      <ListFunctionProvider>
        <ShopListProvider>
          <SharedShopListProvider>
            <ArchivedShopListProvider> 
              <MemberListProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName={initialRouteName}
                    screenOptions={{ headerShown: false }}
                  >
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Register" component={RegisterPage} />
                    <Stack.Screen name="Dashboard" component={DashboardPage} />
                    <Stack.Screen name="Archive" component={ArchivePage} />
                    <Stack.Screen name="MockLogin" component={MockLoginPage} />
                  </Stack.Navigator>

                  <Toast />
                  <StatusBar style="auto" />
                </NavigationContainer>
              </MemberListProvider>
            </ArchivedShopListProvider>
          </SharedShopListProvider>
        </ShopListProvider>
      </ListFunctionProvider>
    </UserIdProvider>
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
