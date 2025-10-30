import { ScrollView, Text, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ShopList from './shopList';
import { useShopList } from '../functions/contexts/shopListContext';

export default function Dashboard({ listFunction }) {
  const { shopLists, refresh } = useShopList();
  
  useEffect(() => {
    const loadLists = async () => {
      try {
        if (listFunction === "list") {
          await refresh();
        } 
      } catch (error) {
        console.error("Error during list fetch:", error);
        setCustomLists([]);
      }
    };

    loadLists();
  }, [listFunction]);

  const activeLists = listFunction === "list" ? shopLists : customLists;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {activeLists.length === 0 ? (
        <Text style={styles.emptyText}>Žádné seznamy</Text>
      ) : (
        <View style={styles.gridContainer}>
          {activeLists.map(list => (
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
