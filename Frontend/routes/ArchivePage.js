import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Footer from '../components/footer';

export default function ArchivePage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Archivované ShopListy</Text>
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
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
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
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  footerWrapper: {
    paddingBottom: 25, // větší mezera od spodní části obrazovky
    marginTop: 10,      // posune footer trochu nahoru
  },
  button: {
    width: '85%',
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    width: '85%',
    borderColor: '#000',
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonTextSecondary: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
