import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import ShopList from './shopList';
import { useArchivedShopList } from '../functions/contexts/listArchivedContext';

export default function DashboardArchived() {
  const { archivedShopLists, refreshArchived, status } = useArchivedShopList();

  useEffect(() => {
    refreshArchived();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* LOADING */}
      {status === "loading" && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Načítám archiv…</Text>
        </View>
      )}

      {/* PRÁZDNÝ STAV */}
      {status === "ready" && (!archivedShopLists || archivedShopLists.length === 0) && (
        <Text style={styles.emptyText}>Žádné archivované seznamy</Text>
      )}

      {/* OBSAH */}
      {status === "ready" && archivedShopLists?.length > 0 && (
        <View style={styles.gridContainer}>
          {archivedShopLists.map((list) => (
            <ShopList
              key={list._id}
              shopList={list}
              listFunctionTobe="listArchived"
            />
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
