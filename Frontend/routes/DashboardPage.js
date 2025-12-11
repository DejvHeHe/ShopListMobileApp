import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import Footer from '../components/footer';
import Dashboard from '../components/dashboard';
import DashboardShared from '../components/dashboardShared';
import { useUserId } from '../functions/contexts/userIdContext';
import { useColorMode } from '../functions/contexts/colorModeContext';

export default function DashboardPage() {
  const { getUserId } = useUserId();
  const { colorMode } = useColorMode(); // true = dark, false = light

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        await getUserId();        
      } catch (err) {
        console.log('❌ Chyba při načítání userId:', err);
      }
    };

    fetchUserId();
  }, []);

  const themeStyles = {
    backgroundColor: colorMode ? "#121212" : "#F5F5F5",
    headerColor: colorMode ? "#fff" : "#000",
    subHeaderColor: colorMode ? "#ccc" : "#333",
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: themeStyles.backgroundColor }]}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.header, { color: themeStyles.headerColor }]}>Moje ShopListy</Text>
          <Dashboard />

          <Text style={[styles.subHeader, { color: themeStyles.subHeaderColor }]}>Sdílené ShopListy</Text>
          <DashboardShared />
        </View>

        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'left',
  },
  footerWrapper: {
    paddingBottom: 25,
    marginTop: 10,
  },
});
