import { ScrollView, Text, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import ShopList from './shopList';
import { useSharedShopList } from '../functions/contexts/sharedShopListContext';

export default function DashboardShared() {
  const { sharedShopLists, refreshShared } = useSharedShopList();

  useEffect(() => {
    refreshShared();
  }, []); 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {(!sharedShopLists || sharedShopLists.length === 0) ? (
        <Text style={styles.emptyText}>Žádné sdílené seznamy</Text>
      ) : (
        <View style={styles.gridContainer}>
          {sharedShopLists.map(list => (
            <ShopList key={list._id} shopList={list} listFunctionTobe="listShared"/>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingVertical: 20, paddingHorizontal: 10 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666', fontSize: 18 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
