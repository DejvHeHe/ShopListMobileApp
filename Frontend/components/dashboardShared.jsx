import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import ShopList from './shopList';
import { useSharedShopList } from '../functions/contexts/sharedShopListContext';

export default function DashboardShared() {
  const { sharedShopLists, refreshShared, status } = useSharedShopList();

  useEffect(() => {
    refreshShared();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* LOADING */}
      {status === "loading" && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Načítám sdílené seznamy…</Text>
        </View>
      )}

      {/* PRÁZDNÝ STAV */}
      {status === "ready" && (!sharedShopLists || sharedShopLists.length === 0) && (
        <Text style={styles.emptyText}>Žádné sdílené seznamy</Text>
      )}

      {/* OBSAH */}
      {status === "ready" && sharedShopLists?.length > 0 && (
        <View style={styles.gridContainer}>
          {sharedShopLists.map(list => (
            <ShopList
              key={list._id}
              shopList={list}
              listFunctionTobe="listShared"
            />
          ))}
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingVertical: 20, paddingHorizontal: 10 },

  emptyText: { 
    textAlign: 'center', 
    marginTop: 50, 
    color: '#666', 
    fontSize: 18 
  },

  loadingContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#444',
    fontSize: 16,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
