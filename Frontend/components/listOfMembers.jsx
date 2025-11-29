import { Pressable, StyleSheet, Text, View, ScrollView, Modal, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { removeFromShare } from '../functions/shopListProvider';
import { Ionicons } from '@expo/vector-icons';
import { useUserId } from '../functions/contexts/userIdContext';
import { useMemberList } from '../functions/contexts/memberListContext';
import { useSharedShopList } from '../functions/contexts/sharedShopListContext';
import { isMock } from '../IS_MOCK';
import { UsersMock } from '../UserMock';

export default function ListOfMembers({ shopListId, onClose, ownerId }) {
  const { memberList, refreshMemberList, status } = useMemberList();  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { userId } = useUserId();
  const { refreshShared } = useSharedShopList();

  const handleUnshare = async () => {
    try {
      if (!selectedMember) return;

    
      if (isMock) {
        const user = UsersMock.find(u => u._id === selectedMember._id);

        if (user && Array.isArray(user.sharedShopList)) {
        
          user.sharedShopList = user.sharedShopList.filter(id => id !== shopListId);
        }

        setIsOpen(false);

        await refreshMemberList(shopListId);
        await refreshShared();

        
        if (ownerId.toString() !== userId) {
          onClose();
        }

        return;
      }

      
      const data = { shopListId, removeId: selectedMember._id };
      await removeFromShare(data);

      setIsOpen(false);
      await refreshMemberList(shopListId);

      if (ownerId.toString() !== userId) {
        onClose();
        await refreshShared();
      }

    } catch (err) {
      console.error("Chyba při mazání člena:", err);
    }
  };


  useEffect(() => {
    if (shopListId) {
      refreshMemberList(shopListId);
    }
  }, [shopListId]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sdíleno s:</Text>

        {/* LOADING */}
        {status === "loading" && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Načítám členy…</Text>
          </View>
        )}

        {/* PRÁZDNÝ STAV */}
        {status === "ready" && memberList?.length === 0 && (
          <Text style={styles.noMembersText}>Žádní členové</Text>
        )}

        {/* OBSAH */}
        {status === "ready" && memberList?.length > 0 && (
          <ScrollView style={styles.memberList}>
            {memberList.map((member, index) => (
              <View key={index} style={styles.memberBox}>
                <Text style={styles.memberText}>{member.name}: {member.email}</Text>

                {(userId === member._id.toString() ||
                  (userId === ownerId.toString() && member._id.toString() !== userId)) && (
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
        )}
      </View>

      {/* Confirm modal */}
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

  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#aaa',
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
