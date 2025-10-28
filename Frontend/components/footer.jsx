import { Pressable, StyleSheet, View, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CreateFrom from './createForm';

export default function Footer() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <View style={styles.footer}>
        <Pressable onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home-outline" size={28} color="black" />
        </Pressable>

        <Pressable onPress={() => setIsOpen(true)}>
          <Ionicons name="add-circle-outline" size={36} color="black" />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Archive')}>
          <Ionicons name="archive-outline" size={28} color="black" />
        </Pressable>
      </View>

      {/* Modal Wrapper */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalBackground}>
          <CreateFrom onClose={() => setIsOpen(false)}/>
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
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // dim background
  },
});