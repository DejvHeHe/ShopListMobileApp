import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Footer from '../components/footer';
import Dashboard from '../components/dashboard';
import { list } from '../functions/shopListProvider';

export default function DashboardPage() {
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Moje ShopListy</Text>
        <Dashboard listFunction={list}/>

        

        <Text style={styles.subHeader}>Sdílené ShopListy</Text>

        
      </View>

      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // bílé pozadí celé stránky
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 25,
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 40,
    marginBottom: 15,
  },
  button: {
    width: '85%',
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
