import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Footer from '../components/footer';
import DashboardShared from '../components/dashboardArchived';
import { useColorMode } from '../functions/contexts/colorModeContext';

export default function ArchivePage() {
  const navigation = useNavigation();
  const { colorMode } = useColorMode(); // true = dark, false = light

  const themeStyles = {
    backgroundColor: colorMode ? "#121212" : "#fff",
    headerColor: colorMode ? "#fff" : "#000",
    borderColor: colorMode ? "#444" : "#eee",
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: themeStyles.backgroundColor }]}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.header, { color: themeStyles.headerColor }]}>Archivované ShopListy</Text>
          <DashboardShared />
        </ScrollView>

        <View style={[styles.footerWrapper, { borderTopColor: themeStyles.borderColor }]}>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  footerWrapper: {
    paddingBottom: 20,
    borderTopWidth: 1,
  },
});
