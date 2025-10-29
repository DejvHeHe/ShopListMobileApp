import { ScrollView, Text, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ShopList from './shopList';

export default function Dashboard({ listFunction }) {
  const [shopLists, setShopLists] = useState([]);

  const getShopList = async () => {
    try {
      const lists = await listFunction();
      setShopLists(Array.isArray(lists) ? lists : []);
    } catch (error) {
      console.error("Error during list:", error);
      setShopLists([]);
    }
  };

  useEffect(() => {    
    getShopList();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {shopLists.length === 0 ? (
        <Text style={styles.emptyText}>Žádné seznamy</Text>
      ) : (
        <View style={styles.gridContainer}>
          {shopLists.map(list => (
            <ShopList key={list._id} shopList={list} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    fontSize: 18,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
