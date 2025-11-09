import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Footer from '../components/footer';
import DashboardShared from '../components/dashboardArchived';

export default function ArchivePage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Archivované ShopListy</Text>
          <DashboardShared />
        </ScrollView>

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
    backgroundColor: '#fff',
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
    color: '#000',
    marginBottom: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  footerWrapper: {
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
