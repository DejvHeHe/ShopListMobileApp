import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Footer from '../components/footer';
import Dashboard from '../components/dashboard';
import DashboardShared from '../components/dashboardShared';

export default function DashboardPage() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Moje ShopListy</Text>
          <Dashboard />

          <Text style={styles.subHeader}>Sdílené ShopListy</Text>
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
    backgroundColor: '#F5F5F5',
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
    color: '#000',
    marginBottom: 25,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'left',
  },
  footerWrapper: {
    paddingBottom: 25, 
    marginTop: 10,      
  },
});
