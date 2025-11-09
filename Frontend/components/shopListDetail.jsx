import { Pressable, StyleSheet, Text, View, ScrollView, Modal } from 'react-native'; 
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AddItemForm from './addItemForm';
import Item from './item';
import UpdateShopListNameForm from './updateShopListNameForm';
import ListOfMembers from './listOfMembers';
import ShareForm from './shareForm';
import { useUserId } from '../functions/contexts/userIdContext';

export default function ShopListDetail({ shopList, onClose }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateNameOpen, setUpdateNameOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredItems, setFilteredItems] = useState(shopList.items || []);
  const { userId, getUserId } = useUserId();
  const [ready, setReady] = useState(false);

  // Načtení userId
  useEffect(() => {
    const fetchUserId = async () => {
      await getUserId();
      setReady(true);
    };
    fetchUserId();
  }, []);

  const openShareForm = () => setShareOpen(true);
  const handleFilterPress = () => setIsFilterActive(prev => !prev);

  useEffect(() => {
    if (isFilterActive) {
      setFilteredItems(shopList.items.filter(item => item.state === 'unchecked'));
    } else {
      setFilteredItems(shopList.items);
    }
  }, [isFilterActive, shopList.items]); 

  const isOwner = ready && shopList.ownerId.toString() === userId;
  const isArchived = shopList.isArchived === true;

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />

      {/* Header */}
      <View style={styles.titleRow}>
        <Text style={styles.modalTitle}>Detail seznamu: {shopList.name}</Text>

        {/* Editace názvu – jen pokud je owner a seznam není archivovaný */}
        {isOwner && !isArchived && (
          <Pressable style={styles.iconButton} onPress={() => setUpdateNameOpen(true)}>
            <Ionicons name="pencil" size={24} color="#fff" />
          </Pressable>
        )}
      </View>

      {/* Hlavní tlačítka */}
      <View style={styles.buttonRow}>
        {/* Přidání položky – jen pokud seznam není archivovaný */}
        {!isArchived && (
          <Pressable style={styles.primaryButton} onPress={() => setIsAddOpen(true)}>
            <Text style={styles.primaryButtonText}>+ Přidat položku</Text>
          </Pressable>
        )}

        {/* Sdílení seznamu – jen pokud je owner a seznam není archivovaný */}
        {isOwner && !isArchived && (
          <Pressable style={styles.secondaryButton} onPress={openShareForm}>
            <Ionicons name="share-social-outline" size={18} color="#fff" />
            <Text style={styles.secondaryButtonText}>Nadílet seznam</Text>
          </Pressable>
        )}
      </View>

      {/* Seznam položek */}
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
            <Item key={item._id || index} item={item} shopListId={shopList._id} isArchived={shopList.isArchived}/>
          ))
        ) : (
          <Text style={styles.itemText}>Žádné položky</Text>
        )}
      </ScrollView>

      {/* Seznam členů */}
      <ListOfMembers shopListId={shopList._id} onClose={onClose} ownerId={shopList.ownerId} />

      {/* Modaly */}
      <Modal visible={isAddOpen} transparent animationType="slide" onRequestClose={() => setIsAddOpen(false)}>
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <AddItemForm shopList={shopList} onClose={() => setIsAddOpen(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={isUpdateNameOpen} transparent animationType="slide" onRequestClose={() => setUpdateNameOpen(false)}>
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <UpdateShopListNameForm shopList={shopList} onClose={() => setUpdateNameOpen(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={isShareOpen} transparent animationType="slide" onRequestClose={() => setShareOpen(false)}>
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <ShareForm shopListId={shopList._id} onClose={() => setShareOpen(false)} />
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
  handle: { width: 40, height: 5, backgroundColor: '#888', borderRadius: 3, alignSelf: 'center', marginBottom: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  iconButton: { padding: 6 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  primaryButton: { backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondaryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  secondaryButtonText: { color: '#fff', fontSize: 15, fontWeight: '500', marginLeft: 6 },
  itemsContainer: { flexGrow: 0 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  itemText: { color: '#fff', fontSize: 16, marginBottom: 8 },
  addItemModalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  addItemModalContent: { backgroundColor: '#000', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '50%' },
});
