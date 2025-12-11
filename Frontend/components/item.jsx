import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { uncheckItem, removeItem } from '../functions/shopListProvider';
import { Ionicons } from '@expo/vector-icons';
import { useShopListDetail } from '../functions/contexts/shopListDetailContext';
import { isMock } from '../IS_MOCK';
import { ShopListsMock } from '../ShopListMock';
import { useColorMode } from '../functions/contexts/colorModeContext';

export default function Item({ item, isArchived }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { shopList, refresh } = useShopListDetail(); 
  const { colorMode } = useColorMode();

  if (!shopList) return <Text style={{ color: colorMode ? '#fff' : '#000' }}>Načítám...</Text>;

  const currentItem = shopList.items.find(i => i._id === item._id);
  const checked = currentItem?.state === 'checked';

  const theme = {
    boxBg: colorMode ? '#222' : '#fff',
    text: colorMode ? '#fff' : '#111',
    modalBg: colorMode ? '#333' : '#fff',
    overlayBg: colorMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.6)',
    btnConfirm: '#f55',
    btnCancel: colorMode ? '#555' : '#ccc',
    btnText: '#fff',
  };

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
        if (list && list.items) list.items = list.items.filter(i => i._id !== item._id);
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
      <View style={[styles.box, { backgroundColor: theme.boxBg }]}>
        <Checkbox
          value={checked}
          onValueChange={handleChange}
          style={styles.checkbox}
          color={checked ? '#000' : undefined}
          disabled={checked || isArchived}
        />
        <Text style={[styles.text, { color: theme.text }]}>{item.name} ({item.count})</Text>

        {!isArchived && (
          <Pressable onPress={() => setModalVisible(true)} style={styles.removeButton}>
            <Ionicons name="trash" size={24} color="red" />
          </Pressable>
        )}
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={[styles.modalOverlay, { backgroundColor: theme.overlayBg }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.modalBg }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>Opravdu chcete smazat položku "{item.name}"?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButtonConfirm, { backgroundColor: theme.btnConfirm }]} onPress={handleRemove}>
                <Text style={[styles.modalButtonText, { color: theme.btnText }]}>Ano</Text>
              </Pressable>
              <Pressable style={[styles.modalButtonCancel, { backgroundColor: theme.btnCancel }]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText, { color: theme.btnText }]}>Ne</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 10, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  checkbox: { marginRight: 12 },
  text: { fontSize: 16, flex: 1 },
  removeButton: { marginLeft: 12 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContent: { padding: 20, borderRadius: 12, width: '80%', alignItems: 'center' },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButtonConfirm: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  modalButtonCancel: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  modalButtonText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
