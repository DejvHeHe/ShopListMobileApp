import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import ShopListDetail from './shopListDetail';
import { Feather } from '@expo/vector-icons';
import { remove, setArchived } from '../functions/shopListProvider';
import { useShopList } from '../functions/contexts/shopListContext';
import { useListFunction } from '../functions/contexts/listFunctionContext';
import { useUserId } from '../functions/contexts/userIdContext';
import { useArchivedShopList } from '../functions/contexts/listArchivedContext';
import Toast from 'react-native-toast-message';

import { ShopListDetailProvider } from "../functions/contexts/shopListDetailContext";

import { isMock } from '../IS_MOCK';
import { ShopListsMock } from '../ShopListMock';

export default function ShopList({ shopList, listFunctionTobe }) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { userId } = useUserId();
  const { refresh } = useShopList();
  const { refreshArchived } = useArchivedShopList();
  const { listFunction, setListFunction } = useListFunction();

  const handleOpen = () => setIsOpen(!isOpen);
  const handleDelete = () => setConfirmDelete(true);

  const handleArchive = async (e) => {
    e.stopPropagation();
    try {
      if (isMock) {
        ShopListsMock.forEach((element) => {
          if (element._id === shopList._id) element.isArchived = !element.isArchived;
        });

        listFunction === "list" ? await refresh() : await refreshArchived();

        Toast.show({
          type: 'success',
          text1: 'Hotovo',
          text2: shopList.isArchived
            ? 'ShopList byl odstraněn z archivu'
            : 'ShopList byl archivován',
        });
      } else {
        await setArchived({ shopListId: shopList._id });

        listFunction === "list" ? await refresh() : await refreshArchived();

        Toast.show({
          type: 'success',
          text1: 'Hotovo',
          text2: shopList.isArchived
            ? 'ShopList byl odstraněn z archivu'
            : 'ShopList byl archivován',
        });
      }
    } catch (err) {
      console.log("Set archived error:", err);
    }
  };

  const confirmDeleteAction = async () => {
    try {
      if (isMock) {
        const index = ShopListsMock.findIndex(l => l._id === shopList._id);
        if (index !== -1) ShopListsMock.splice(index, 1);

        listFunction === "list" ? await refresh() : await refreshArchived();

        Toast.show({ type: 'success', text1: 'Hotovo', text2: 'ShopList byl smazán' });
      } else {
        await remove({ shopListId: shopList._id });

        listFunction === "list" ? await refresh() : await refreshArchived();

        Toast.show({ type: 'success', text1: 'Hotovo', text2: 'ShopList byl smazán' });
      }
    } catch (err) {
      console.log('Delete error:', err);
      Toast.show({ type: 'error', text1: 'Chyba', text2: err.message });
    }
    setConfirmDelete(false);
  };

  useEffect(() => {
    if (listFunctionTobe && listFunctionTobe !== listFunction) {
      setListFunction(listFunctionTobe);
    }
  }, [listFunctionTobe]);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.box,
          pressed && { backgroundColor: '#e0e0e0' },
        ]}
        onPress={handleOpen}
      >
        {shopList.ownerId === userId && (
          <View style={styles.actionButtons}>
            <Pressable
              onPress={(e) => { e.stopPropagation(); handleDelete(); }}
              style={styles.iconButton}
              hitSlop={10}
            >
              <Feather name="trash-2" size={22} color="#b00020" />
            </Pressable>

            <Pressable
              onPress={handleArchive}
              style={styles.iconButton}
              hitSlop={10}
            >
              <Feather name={"archive"} size={22} color={"#555"} />
            </Pressable>
          </View>
        )}

        <Text style={styles.name}>{shopList.name}</Text>
        <Text style={styles.details}>
          Počet položek: {shopList.items ? shopList.items.length : 0}
        </Text>
      </Pressable>

      {/* -------- DETAIL MODAL + PROVIDER -------- */}
      <Modal
        isVisible={isOpen}
        onBackdropPress={handleOpen}
        swipeDirection="down"
        style={styles.modalContainer}
        propagateSwipe={true}
      >
        <ShopListDetailProvider shopListId={shopList._id}>
          <ShopListDetail onClose={() => setIsOpen(false)} />
        </ShopListDetailProvider>
      </Modal>

      {/* ---- DELETE MODAL ---- */}
      <Modal
        isVisible={confirmDelete}
        onBackdropPress={() => setConfirmDelete(false)}
        style={styles.confirmModalContainer}
      >
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>Opravdu chcete smazat?</Text>

          <View style={styles.confirmButtons}>
            <Pressable onPress={confirmDeleteAction} style={[styles.btn, styles.btnYes]}>
              <Text style={styles.btnText}>Ano</Text>
            </Pressable>

            <Pressable onPress={() => setConfirmDelete(false)} style={[styles.btn, styles.btnNo]}>
              <Text style={styles.btnText}>Ne</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: '48%',
    alignItems: 'center',
    position: 'relative'
  },
  actionButtons: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', gap: 10 },
  iconButton: { padding: 4 },
  name: { fontSize: 20, fontWeight: '700', color: '#111', marginBottom: 8 },
  details: { fontSize: 16, color: '#555' },
  modalContainer: { justifyContent: 'flex-end', margin: 0 },
  confirmModalContainer: { justifyContent: 'center', alignItems: 'center' },
  confirmBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center'
  },
  confirmTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
  confirmButtons: { flexDirection: 'row', gap: 20 },
  btn: { paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10 },
  btnYes: { backgroundColor: '#b00020' },
  btnNo: { backgroundColor: '#555' },
  btnText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
