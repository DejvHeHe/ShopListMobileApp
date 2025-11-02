import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import ShopListDetail from './shopListDetail';


export default function ShopList({ shopList,listFunctionTobe}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.box,
          pressed && { backgroundColor: '#e0e0e0' },
        ]}
        onPress={handleOpen}
      >
        <Text style={styles.name}>{shopList.name}</Text>
        <Text style={styles.details}>
          Počet položek: {shopList.items ? shopList.items.length : 0}
        </Text>
      </Pressable>

      <Modal
        isVisible={isOpen}
        onBackdropPress={handleOpen}
        swipeDirection="down"
        style={styles.modalContainer}
        propagateSwipe={true}
      >
        <ShopListDetail shopList={shopList} onClose={()=>{setIsOpen(false)}} listFunctionTobe={listFunctionTobe} />
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
});
