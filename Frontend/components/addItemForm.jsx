import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { addItem } from '../functions/shopListProvider';
import Toast from 'react-native-toast-message';
import { useShopListDetail } from '../functions/contexts/shopListDetailContext';

import { isMock } from '../IS_MOCK';
import { ShopListsMock } from '../ShopListMock';

export default function AddItemForm({ onClose }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const { shopList, refresh } = useShopListDetail(); // <- používáme detail context

  if (!shopList) {
    return <Text>Načítám...</Text>;
  }

  const handleAddItem = async () => {
    try {
      if (count < 1) {
        Toast.show({
          type: "error",
          text1: "Chybný počet",
          text2: "Počet musí být alespoň 1.",
        });
        return;
      }

      if (isMock) {
        // najdi správný shopList a přidej item
        const list = ShopListsMock.find(l => l._id === shopList._id);
        if (list) {
          if (!list.items) list.items = [];

          const lastId = list.items.length > 0 ? Math.max(...list.items.map(i => i._id)) : 0;
          const newId = lastId + 1;

          list.items.push({
            _id: newId,
            name,
            count,
            state: "unchecked",
          });
        }

        Toast.show({ type: 'success', text1: 'Hotovo', text2: 'Item byl přidán (mock)' });
        await refresh(); // reload pouze detailu
        onClose();
        return;
      }

      // skutečné API volání
      const data = { shopListId: shopList._id, itemName: name, count };
      const result = await addItem(data);

      if (result.error) {
        Toast.show({ type: 'error', text1: 'Chyba', text2: result.message });
        return;
      }

      Toast.show({ type: 'success', text1: 'Hotovo', text2: 'Item byl přidán' });
      await refresh(); // reload pouze detailu
      onClose();
    } catch (error) {
      console.log("AddItemForm error:", error);
      Toast.show({ type: 'error', text1: 'Chyba', text2: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Jméno položky:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChange={e => setName(e.nativeEvent.text)}
      />
      <Text style={styles.label}>Počet:</Text>
      <TextInput
        style={styles.input}
        value={count.toString()}
        keyboardType="numeric"
        onChange={e => {
          const val = parseInt(e.nativeEvent.text, 10);
          setCount(isNaN(val) ? 0 : val);
        }}
      />

      <Pressable
        style={[styles.button, !name && { opacity: 0.5 }]}
        onPress={handleAddItem}
        disabled={!name}
      >
        <Text style={styles.buttonText}>Potvrdit</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Zrušit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
