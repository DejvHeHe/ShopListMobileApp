import { Pressable, StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { viewSharedTo, removeFromShare } from '../functions/shopListProvider';
import { Ionicons } from '@expo/vector-icons';
import { useUserId } from '../functions/contexts/userIdContext';

export default function ListOfMembers({ shopListId }) {
  const [listOfMembers, setListOfMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { userId } = useUserId();

  const getListOfMembers = async () => {
    try {
      const data = { shopListId };
      const list = await viewSharedTo(data);
      setListOfMembers(list);
    } catch (err) {
      console.error("Chyba při načítání členů:", err);
    }
  };

  const handleUnshare = async () => {
    try {
      if (selectedMember) {
        const data = { shopListId, removeId: selectedMember._id };
        await removeFromShare(data);
        setIsOpen(false);
        getListOfMembers(); 
      }
    } catch (err) {
      console.error("Chyba při mazání člena:", err);
    }
  };

  useEffect(() => {
    if (shopListId) {
      getListOfMembers();
    }
  }, [shopListId]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sdíleno s:</Text>
        {listOfMembers && listOfMembers.length > 0 ? (
          <ScrollView style={styles.memberList}>
            {listOfMembers.map((member, index) => (
              <View key={index} style={styles.memberBox}>
                <Text style={styles.memberText}>{member.name}: {member.email}</Text>
                
                {member._id.toString() === userId && (
                  <Pressable 
                    style={styles.iconButton} 
                    onPress={() => {
                      setSelectedMember(member);
                      setIsOpen(true);
                    }}
                  >
                    <Ionicons name="person-remove-outline" size={24} color="#f55" />
                  </Pressable>
                )}
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noMembersText}>Žádní členové</Text>
        )}
      </View>

      <Modal visible={isOpen} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Opravdu chcete odebrat {selectedMember?.name || "tohoto uživatele"}?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButtonConfirm} onPress={handleUnshare}>
                <Text style={styles.modalButtonText}>Ano</Text>
              </Pressable>
              <Pressable style={styles.modalButtonCancel} onPress={() => setIsOpen(false)}>
                <Text style={styles.modalButtonText}>Ne</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  memberList: {
    maxHeight: 200,
  },
  memberBox: {
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberText: {
    color: '#fff',
    fontSize: 16,
  },
  iconButton: {
    padding: 5,
  },
  noMembersText: {
    color: '#aaa',
    fontSize: 16,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalButtonConfirm: {
    backgroundColor: '#f55',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonCancel: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
