import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox'; 
import { uncheckItem, removeItem } from '../functions/shopListProvider';
import { Ionicons } from '@expo/vector-icons';
import { useShopList } from '../functions/contexts/shopListContext';
import { useListFunction } from '../functions/contexts/listFunctionContext';
import { useSharedShopList } from '../functions/contexts/sharedShopListContext';
import { isMock } from '../IS_MOCK';
import { ShopListsMock } from '../ShopListMock';

export default function Item({ item, shopListId, isArchived }) {
  const [checked, setChecked] = useState(item.state === 'checked');
  const [modalVisible, setModalVisible] = useState(false);

  const { refresh } = useShopList();
  const { listFunction } = useListFunction();
  const { refreshShared } = useSharedShopList();

  const handleChange = async () => {
    // API logika: jednosměrný check
    if (checked) return; 
    setChecked(true);

    try {
      if (isMock) {
        const list = ShopListsMock.find(l => l._id === shopListId);
        if (list && list.items) {
          const targetItem = list.items.find(i => i._id === item._id);
          if (targetItem && targetItem.state === 'unchecked') {
            targetItem.state = 'checked';
          }
        }

        if (listFunction === "list") await refresh();
        else if (listFunction === "listShared") await refreshShared();
        return;
      }

      // Reálné API
      await uncheckItem({ shopListId, itemId: item._id });
      if (listFunction === "list") await refresh();
      else if (listFunction === "listShared") await refreshShared();

    } catch (err) {
      console.error("Chyba při update itemu:", err);
    }
  };

  const handleRemove = async () => {
    try {
      if (isMock) {
        const list = ShopListsMock.find(l => l._id === shopListId);
        if (list && list.items) {
          list.items = list.items.filter(i => i._id !== item._id);
        }

        if (listFunction === "list") await refresh();
        else if (listFunction === "listShared") await refreshShared();

        setModalVisible(false);
        return;
      }

      // Reálné API
      await removeItem({ shopListId, itemId: item._id });
      if (listFunction === "list") await refresh();
      else if (listFunction === "listShared") await refreshShared();

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
          disabled={checked || isArchived} // nelze unchecknout ani u archivovaných
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
