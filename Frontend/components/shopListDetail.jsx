import { Pressable, StyleSheet, Text, View, ScrollView, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

import AddItemForm from './addItemForm';
import Item from './item';
import UpdateShopListNameForm from './updateShopListNameForm';
import ListOfMembers from './listOfMembers';
import ShareForm from './shareForm';

import { useUserId } from '../functions/contexts/userIdContext';
import { useShopListDetail } from '../functions/contexts/shopListDetailContext';
import { useColorMode } from '../functions/contexts/colorModeContext';

const screenWidth = Dimensions.get('window').width;

export default function ShopListDetail({ onClose }) {
  const { userId } = useUserId();
  const { shopList, status, refresh } = useShopListDetail();
  const { colorMode } = useColorMode(); // 🆕 

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateNameOpen, setUpdateNameOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [chartData, setChartData] = useState([]);

  const theme = {
    background: colorMode ? '#1E1E1E' : '#fff',
    modalBackground: colorMode ? '#333' : '#fff',
    text: colorMode ? '#fff' : '#111',
    secondaryText: colorMode ? '#ccc' : '#555',
    chartChecked: '#00bfff',
    chartUnchecked: colorMode ? '#777' : '#aaa',
    icon: colorMode ? '#00bfff' : '#fff',
    buttonPrimary: '#00bfff',
    buttonSecondary: colorMode ? '#444' : '#444',
    itemText: colorMode ? '#aaa' : '#555',
  };

  useEffect(() => {
    if (shopList) {
      const itemsToShow = isFilterActive
        ? shopList.items.filter(i => i.state === "unchecked")
        : shopList.items;
      setFilteredItems(itemsToShow);

      const checked = shopList.items.filter(i => i.state === "checked").length;
      const unchecked = shopList.items.filter(i => i.state === "unchecked").length;

      setChartData([
        { name: "Checked", population: checked, color: theme.chartChecked, legendFontColor: theme.text, legendFontSize: 14 },
        { name: "Unchecked", population: unchecked, color: theme.chartUnchecked, legendFontColor: theme.text, legendFontSize: 14 },
      ]);
    }
  }, [shopList, isFilterActive, colorMode]);

  if (status === "loading" || !shopList) {
    return (
      <Text style={{ color: theme.text, textAlign: "center", marginTop: 20 }}>
        Načítám seznam...
      </Text>
    );
  }

  const isOwner = shopList.ownerId.toString() === userId;
  const isArchived = shopList.isArchived;

  return (
    <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
      <View style={styles.handle} />

      <View style={styles.titleRow}>
        <Text style={[styles.modalTitle, { color: theme.text }]}>Detail seznamu: {shopList.name}</Text>

        {isOwner && !isArchived && (
          <Pressable style={styles.iconButton} onPress={() => setUpdateNameOpen(true)}>
            <Ionicons name="pencil" size={24} color={theme.text} />
          </Pressable>
        )}
      </View>

      {/* --- PieChart --- */}
      {chartData.length > 0 && (
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={200}
          chartConfig={{
            backgroundColor: theme.modalBackground,
            backgroundGradientFrom: theme.modalBackground,
            backgroundGradientTo: theme.modalBackground,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}

      <View style={styles.buttonRow}>
        {!isArchived && (
          <Pressable style={[styles.primaryButton, { backgroundColor: theme.buttonPrimary }]} onPress={() => setIsAddOpen(true)}>
            <Text style={styles.primaryButtonText}>+ Přidat položku</Text>
          </Pressable>
        )}

        {isOwner && !isArchived && (
          <Pressable style={[styles.secondaryButton, { backgroundColor: theme.buttonSecondary }]} onPress={() => setShareOpen(true)}>
            <Ionicons name="share-social-outline" size={18} color={theme.text} />
            <Text style={[styles.secondaryButtonText, { color: theme.text }]}>Nadílet seznam</Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.itemsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Položky:</Text>

          <Pressable onPress={() => setIsFilterActive(p => !p)} style={styles.iconButton}>
            <Ionicons
              name={isFilterActive ? "filter" : "filter-outline"}
              size={22}
              color={isFilterActive ? theme.chartChecked : theme.icon}
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
              colorMode={colorMode} // 🆕 předat barvy do item
            />
          ))
        ) : (
          <Text style={{ color: theme.itemText, textAlign: "center", marginTop: 15 }}>Žádné položky</Text>
        )}
      </ScrollView>

      <ListOfMembers shopList={shopList} onClose={onClose} />

      {/* --- ADD ITEM --- */}
      <Modal visible={isAddOpen} transparent animationType="slide">
        <View style={[styles.addItemModalBackground, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.addItemModalContent, { backgroundColor: theme.modalBackground }]}>
            <AddItemForm shopList={shopList} onClose={() => { setIsAddOpen(false); refresh(); }} />
          </View>
        </View>
      </Modal>

      {/* --- UPDATE NAME --- */}
      <Modal visible={isUpdateNameOpen} transparent animationType="slide">
        <View style={[styles.addItemModalBackground, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.addItemModalContent, { backgroundColor: theme.modalBackground }]}>
            <UpdateShopListNameForm shopList={shopList} onClose={() => { setUpdateNameOpen(false); refresh(); }} />
          </View>
        </View>
      </Modal>

      {/* --- SHARE LIST --- */}
      <Modal visible={isShareOpen} transparent animationType="slide">
        <View style={[styles.addItemModalBackground, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.addItemModalContent, { backgroundColor: theme.modalBackground }]}>
            <ShareForm shopList={shopList} onClose={() => { setShareOpen(false); refresh(); }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "#777",
  },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: 22, fontWeight: "700" },
  iconButton: { padding: 6 },
  buttonRow: { flexDirection: "row", gap: 10, marginTop: 15 },
  primaryButton: { padding: 10, borderRadius: 10 },
  primaryButtonText: { color: "#fff", fontSize: 16 },
  secondaryButton: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 10, gap: 5 },
  secondaryButtonText: { fontSize: 16 },
  itemsContainer: { marginTop: 15 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  addItemModalBackground: { flex: 1, justifyContent: "center" },
  addItemModalContent: { padding: 20, borderRadius: 12 },
});
