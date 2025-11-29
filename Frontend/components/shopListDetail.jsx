import { Pressable, StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import AddItemForm from './addItemForm';
import Item from './item';
import UpdateShopListNameForm from './updateShopListNameForm';
import ListOfMembers from './listOfMembers';
import ShareForm from './shareForm';

import { useUserId } from '../functions/contexts/userIdContext';
import { useShopListDetail } from '../functions/contexts/shopListDetailContext';

export default function ShopListDetail({ onClose }) {
  const { userId } = useUserId();
  const { shopList, status, refresh } = useShopListDetail();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateNameOpen, setUpdateNameOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (shopList) {
      setFilteredItems(
        isFilterActive
          ? shopList.items.filter(i => i.state === "unchecked")
          : shopList.items
      );
    }
  }, [shopList, isFilterActive]);

  if (status === "loading" || !shopList) {
    return (
      <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
        Načítám seznam...
      </Text>
    );
  }

  const isOwner = shopList.ownerId.toString() === userId;
  const isArchived = shopList.isArchived;

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />

      <View style={styles.titleRow}>
        <Text style={styles.modalTitle}>Detail seznamu: {shopList.name}</Text>

        {isOwner && !isArchived && (
          <Pressable style={styles.iconButton} onPress={() => setUpdateNameOpen(true)}>
            <Ionicons name="pencil" size={24} color="#fff" />
          </Pressable>
        )}
      </View>

      <View style={styles.buttonRow}>
        {!isArchived && (
          <Pressable style={styles.primaryButton} onPress={() => setIsAddOpen(true)}>
            <Text style={styles.primaryButtonText}>+ Přidat položku</Text>
          </Pressable>
        )}

        {isOwner && !isArchived && (
          <Pressable style={styles.secondaryButton} onPress={() => setShareOpen(true)}>
            <Ionicons name="share-social-outline" size={18} color="#fff" />
            <Text style={styles.secondaryButtonText}>Nadílet seznam</Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.itemsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Položky:</Text>

          <Pressable onPress={() => setIsFilterActive(p => !p)} style={styles.iconButton}>
            <Ionicons
              name={isFilterActive ? "filter" : "filter-outline"}
              size={22}
              color={isFilterActive ? "#00bfff" : "#fff"}
            />
          </Pressable>
        </View>

        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Item
              key={item._id || index}
              item={item}
              shopListId={shopList._id}
              isArchived={isArchived}
            />
          ))
        ) : (
          <Text style={styles.itemText}>Žádné položky</Text>
        )}
      </ScrollView>

      <ListOfMembers shopList={shopList} onClose={onClose} />

      {/* --- ADD ITEM --- */}
      <Modal visible={isAddOpen} transparent animationType="slide">
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <AddItemForm shopList={shopList} onClose={() => { setIsAddOpen(false); refresh(); }} />
          </View>
        </View>
      </Modal>

      {/* --- UPDATE NAME --- */}
      <Modal visible={isUpdateNameOpen} transparent animationType="slide">
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <UpdateShopListNameForm shopList={shopList} onClose={() => { setUpdateNameOpen(false); refresh(); }} />
          </View>
        </View>
      </Modal>

      {/* --- SHARE LIST --- */}
      <Modal visible={isShareOpen} transparent animationType="slide">
        <View style={styles.addItemModalBackground}>
          <View style={styles.addItemModalContent}>
            <ShareForm shopList={shopList} onClose={() => { setShareOpen(false); refresh(); }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#333",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: "#777",
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 15,
  },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  iconButton: { padding: 6 },

  buttonRow: { flexDirection: "row", gap: 10, marginTop: 15 },
  primaryButton: { backgroundColor: "#00bfff", padding: 10, borderRadius: 10 },
  primaryButtonText: { color: "#fff", fontSize: 16 },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  secondaryButtonText: { color: "#fff", fontSize: 16 },

  itemsContainer: { marginTop: 15 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  itemText: { color: "#aaa", textAlign: "center", marginTop: 15 },

  addItemModalBackground: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  addItemModalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 12 },
});
