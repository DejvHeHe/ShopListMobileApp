import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import ShopList from './shopList';
import { useSharedShopList } from '../functions/contexts/sharedShopListContext';
import { useColorMode } from '../functions/contexts/colorModeContext';
import { useLanguage } from '../functions/contexts/languageContext';

export default function DashboardShared() {
  const { sharedShopLists, refreshShared, status } = useSharedShopList();
  const { colorMode } = useColorMode();
  const { t } = useLanguage(); // 🆕 překladová funkce

  const theme = {
    background: colorMode ? '#1E1E1E' : '#fff',
    text: colorMode ? '#fff' : '#444',
    textSecondary: colorMode ? '#ccc' : '#666',
  };

  useEffect(() => {
    refreshShared();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.background }]}>
      
      {/* LOADING */}
      {status === "loading" && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>{t('shared_loading')}</Text>
        </View>
      )}

      {/* PRÁZDNÝ STAV */}
      {status === "ready" && (!sharedShopLists || sharedShopLists.length === 0) && (
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>{t('shared_empty')}</Text>
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
    fontSize: 18 
  },

  loadingContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
