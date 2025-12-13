import { Pressable, StyleSheet, View, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CreateFrom from './createForm';
import { useColorMode } from '../functions/contexts/colorModeContext';

export default function Footer() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode(); // true = dark, false = light

  const themeStyles = {
    footerBackground: colorMode ? "#1E1E1E" : "#fff",
    borderColor: colorMode ? "#444" : "#ccc",
    iconColor: colorMode ? "#00bfff" : "#000",
    modalOverlay: colorMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.5)",
  };

  return (
    <>
      <View style={[styles.footer, { backgroundColor: themeStyles.footerBackground, borderColor: themeStyles.borderColor }]}>           

        <Pressable onPress={() => navigation.navigate('Archive')}>
          <Ionicons name="archive-outline" size={28} color={themeStyles.iconColor} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home-outline" size={28} color={themeStyles.iconColor} />
        </Pressable>
        
        <Pressable onPress={() => setIsOpen(true)}>
          <Ionicons name="add-circle-outline" size={36} color={themeStyles.iconColor} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={28} color={themeStyles.iconColor} />
        </Pressable>

      </View>

      {/* Modal Wrapper */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={[styles.modalBackground, { backgroundColor: themeStyles.modalOverlay }]}>
          <CreateFrom onClose={() => setIsOpen(false)} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
