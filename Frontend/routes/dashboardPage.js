import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Footer from '../components/footer';
import Dashboard from '../components/dashboard';


export default function DashboardPage() {
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Moje ShopListy</Text>
        <Dashboard listFunction="list"/>

        

        <Text style={styles.subHeader}>Sdílené ShopListy</Text>
        <Dashboard listFunction="listShared"/>

        
      </View>

      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // světle šedé pozadí pro lepší kontrast
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
  dashboardContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    width: '85%',
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
