import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import ShopListDetail from './shopListDetail';
import { Feather } from '@expo/vector-icons';
import { remove } from '../functions/shopListProvider';
import { useSharedShopList } from '../functions/contexts/sharedShopListContext';
import { useShopList } from '../functions/contexts/shopListContext';
import { useListFunction } from '../functions/contexts/listFunctionContext';

export default function ShopList({ shopList, listFunctionTobe }) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { refreshShared } = useSharedShopList();
  const { refresh } = useShopList();
  const { listFunction, setListFunction } = useListFunction();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  // ✅ Mazání + refresh
  const confirmDeleteAction = async () => {
    const data = { shopListId: shopList._id };

    try {
      await remove(data); 

      if (listFunction === 'list') {
        await refresh();
      } else {
        await refreshShared();
      }
    } catch (err) {
      console.log('Delete error:', err);
    }

    setConfirmDelete(false);
  };

  // ✅ Nastavení listFunction z props
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
        {/* ✅ Trash ikonka s blokováním kliknutí */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation(); // ✅ zabrání otevření detailu
            handleDelete();
          }}
          style={styles.deleteButton}
          hitSlop={10}
        >
          <Feather name="trash-2" size={22} color="#b00020" />
        </Pressable>

        <Text style={styles.name}>{shopList.name}</Text>
        <Text style={styles.details}>
          Počet položek: {shopList.items ? shopList.items.length : 0}
        </Text>
      </Pressable>

      {/* ✅ DETAIL MODAL */}
      <Modal
        isVisible={isOpen}
        onBackdropPress={handleOpen}
        swipeDirection="down"
        style={styles.modalContainer}
        propagateSwipe={true}
      >
        <ShopListDetail shopList={shopList} onClose={() => setIsOpen(false)} />
      </Modal>

      {/* ✅ CONFIRM DELETE MODAL */}
      <Modal
        isVisible={confirmDelete}
        onBackdropPress={() => setConfirmDelete(false)}
        style={styles.confirmModalContainer}
      >
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>Opravdu chcete smazat?</Text>

          <View style={styles.confirmButtons}>
            <Pressable
              onPress={confirmDeleteAction}
              style={[styles.btn, styles.btnYes]}
            >
              <Text style={styles.btnText}>Ano</Text>
            </Pressable>

            <Pressable
              onPress={() => setConfirmDelete(false)}
              style={[styles.btn, styles.btnNo]}
            >
              <Text style={styles.btnText}>Ne</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

// ✅ STYLY
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
    position: 'relative',
  },

  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },

  details: {
    fontSize: 16,
    color: '#555',
  },

  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  // ✅ CONFIRM MODAL
  confirmModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  btnYes: {
    backgroundColor: '#b00020',
  },
  btnNo: {
    backgroundColor: '#555',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
