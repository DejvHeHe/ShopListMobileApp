import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox'; 
import { uncheckItem, removeItem } from '../functions/shopListProvider';
import { Ionicons } from '@expo/vector-icons';
import { useShopList } from '../functions/contexts/shopListContext';

export default function Item({ item, shopListId }) {
  const [checked, setChecked] = useState(item.state === 'checked');
  const data = { shopListId, itemId: item._id };
  const { shopLists, refresh } = useShopList();

  const handleChange = async () => {
    if (!checked) {
      setChecked(true);
      try {
        await uncheckItem(data);
        await refresh()
       
      } catch (err) {
        console.error("Chyba při update itemu:", err);
      }
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(data);
      await refresh();
      console.log('Item odstraněn');
    } catch (err) {
      console.error('Chyba při odstranění itemu:', err);
    }
  };

  return (
    <View style={styles.box}>
      <Checkbox
        value={checked}
        onValueChange={handleChange}
        style={styles.checkbox}
        color={checked ? '#000' : undefined} 
        disabled={checked} 
      />
      <Text style={styles.text}>
        {item.name} ({item.count})
      </Text>
      <Pressable onPress={handleRemove} style={styles.removeButton}>
        <Ionicons name="trash" size={24} color="red" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: '#111',
    flex: 1,
  },
  removeButton: {
    marginLeft: 12,
  },
});
