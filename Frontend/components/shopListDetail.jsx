import { Pressable, StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AddItemForm from './addItemForm';
import Item from './item';
import UpdateShopListNameForm from './updateShopListNameForm';
import ListOfMembers from './listOfMembers';

export default function ShopListDetail({ shopList }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateNameOpen, setUpdateNameOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredItems, setFilteredItems] = useState(shopList.items || []);

  // refreshuje seznam podle stavu filtru
  const handleFilterPress = () => {
    setIsFilterActive(prev => !prev);
  };

  // automatický refresh itemů, když se změní filtr
  useEffect(() => {
    if (isFilterActive) {
      setFilteredItems(shopList.items.filter(item => item.state === 'unchecked'));
    } else {
      setFilteredItems(shopList.items);
    }
  }, [isFilterActive, shopList.items]);

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />

      <View style={styles.titleRow}>
        <Text style={styles.modalTitle}>Detail seznamu: {shopList.name}</Text>
        <Pressable style={styles.iconButton} onPress={() => setUpdateNameOpen(true)}>
          <Ionicons name="pencil" size={24} color="#fff" />
        </Pressable>
      </View>

      <Pressable style={styles.addButton} onPress={() => setIsAddOpen(true)}>
        <Text style={styles.addButtonText}>+ Přidat položku</Text>
      </Pressable>

      <ScrollView style={styles.itemsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Položky:</Text>
          <Pressable onPress={handleFilterPress} style={styles.iconButton}>
            <Ionicons
              name={isFilterActive ? 'filter' : 'filter-outline'}
              size={22}
              color={isFilterActive ? '#00bfff' : '#fff'}
            />
          </Pressable>
        </View>

        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Item key={item._id || index} item={item} shopListId={shopList._id} />
          ))
        ) : (
          <Text style={styles.itemText}>Žádné položky</Text>
        )}
      </ScrollView>

      <ListOfMembers shopListId={shopList._id} />

      {/* Modal pro přidání nové položky */}
      <Modal
        visible={isAddOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAddOpen(false)}
      >
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <AddItemForm shopList={shopList} onClose={() => setIsAddOpen(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal pro přejmenování seznamu */}
      <Modal
        visible={isUpdateNameOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setUpdateNameOpen(false)}
      >
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <UpdateShopListNameForm shopList={shopList} onClose={() => setUpdateNameOpen(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    maxHeight: '70%',
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#888',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  iconButton: {
    padding: 6,
  },
  addButton: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemsContainer: {
    flexGrow: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  addItemModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  addItemModalContent: {
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
});
