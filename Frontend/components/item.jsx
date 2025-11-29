import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { uncheckItem, removeItem } from '../functions/shopListProvider';
import { Ionicons } from '@expo/vector-icons';
import { useShopListDetail } from '../functions/contexts/shopListDetailContext';
import { isMock } from '../IS_MOCK';
import { ShopListsMock } from '../ShopListMock';

export default function Item({ item, isArchived }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { shopList, refresh } = useShopListDetail(); 

  if (!shopList) return <Text>Načítám...</Text>;

  // Vezmeme aktuální stav položky z provideru
  const currentItem = shopList.items.find(i => i._id === item._id);
  const checked = currentItem?.state === 'checked';

  const handleChange = async () => {
    if (checked) return;

    try {
      if (isMock) {
        const list = ShopListsMock.find(l => l._id === shopList._id);
        if (list && list.items) {
          const targetItem = list.items.find(i => i._id === item._id);
          if (targetItem) targetItem.state = 'checked';
        }
        await refresh();
        return;
      }

      await uncheckItem({ shopListId: shopList._id, itemId: item._id });
      await refresh();
    } catch (err) {
      console.error("Chyba při update itemu:", err);
    }
  };

  const handleRemove = async () => {
    try {
      if (isMock) {
        const list = ShopListsMock.find(l => l._id === shopList._id);
        if (list && list.items) {
          list.items = list.items.filter(i => i._id !== item._id);
        }
        await refresh();
        setModalVisible(false);
        return;
      }

      await removeItem({ shopListId: shopList._id, itemId: item._id });
      await refresh();
      setModalVisible(false);
    } catch (err) {
      console.error('Chyba při odstranění itemu:', err);
    }
  };

  return (
    <>
      <View style={styles.box}>
        <Checkbox
          value={checked}
          onValueChange={handleChange}
          style={styles.checkbox}
          color={checked ? '#000' : undefined}
          disabled={checked || isArchived}
        />
        <Text style={styles.text}>{item.name} ({item.count})</Text>

        {!isArchived && (
          <Pressable onPress={() => setModalVisible(true)} style={styles.removeButton}>
            <Ionicons name="trash" size={24} color="red" />
          </Pressable>
        )}
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Opravdu chcete smazat položku "{item.name}"?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButtonConfirm} onPress={handleRemove}>
                <Text style={styles.modalButtonText}>Ano</Text>
              </Pressable>
              <Pressable style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Ne</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginBottom: 10, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  checkbox: { marginRight: 12 },
  text: { fontSize: 16, color: '#111', flex: 1 },
  removeButton: { marginLeft: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '80%', alignItems: 'center' },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButtonConfirm: { backgroundColor: '#f55', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  modalButtonCancel: { backgroundColor: '#555', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontSize: 16 },
});
