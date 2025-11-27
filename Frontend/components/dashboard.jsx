import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import ShopList from './shopList';
import { useShopList } from '../functions/contexts/shopListContext';

export default function Dashboard() {
  const { shopLists, refresh, status } = useShopList();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* LOADING */}
      {status === "loading" && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Načítám seznamy…</Text>
        </View>
      )}

      {/* PRÁZDNÝ STAV */}
      {status === "ready" && (!shopLists || shopLists.length === 0) && (
        <Text style={styles.emptyText}>Žádné vaše seznamy</Text>
      )}

      {/* OBSAH */}
      {status === "ready" && shopLists?.length > 0 && (
        <View style={styles.gridContainer}>
          {shopLists.map(list => (
            <ShopList key={list._id} shopList={list} listFunctionTobe="list" />
          ))}
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingVertical: 20, paddingHorizontal: 10 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666', fontSize: 18 },

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
