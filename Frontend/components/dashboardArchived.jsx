import { ScrollView, Text, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import ShopList from './shopList';
import { useArchivedShopList } from '../functions/contexts/listArchivedContext';

export default function DashboardArchived() {
  const { archivedShopLists, refreshArchived } = useArchivedShopList();

  useEffect(() => {
    refreshArchived();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {(!archivedShopLists || archivedShopLists.length === 0) ? (
        <Text style={styles.emptyText}>Žádné archivované seznamy</Text>
      ) : (
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
