import { Pressable, StyleSheet, View, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { removeFromShare } from '../functions/shopListProvider';
import { Ionicons } from '@expo/vector-icons';
import { useUserId } from '../functions/contexts/userIdContext';
import { useMemberList } from '../functions/contexts/memberListContext';
import { useSharedShopList } from '../functions/contexts/sharedShopListContext';
import { isMock } from '../IS_MOCK';
import { UsersMock } from '../UserMock';
import { useColorMode } from '../functions/contexts/colorModeContext';
import { useLanguage } from '../functions/contexts/languageContext';

export default function ListOfMembers({ shopListId, onClose, ownerId }) {
  const { memberList, refreshMemberList, status } = useMemberList();  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { userId } = useUserId();
  const { refreshShared } = useSharedShopList();
  const { colorMode } = useColorMode();
  const { t } = useLanguage();

  const theme = {
    background: colorMode ? '#1E1E1E' : '#fff',
    container: colorMode ? '#111' : '#f5f5f5',
    memberBox: colorMode ? '#222' : '#eee',
    text: colorMode ? '#fff' : '#000',
    textSecondary: colorMode ? '#aaa' : '#555',
    modalBackground: colorMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
    modalContent: colorMode ? '#333' : '#fff',
    btnConfirm: '#f55',
    btnCancel: colorMode ? '#555' : '#ccc',
    btnText: '#fff',
  };

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
        if (ownerId.toString() !== userId) onClose();
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
    if (shopListId) refreshMemberList(shopListId);
  }, [shopListId]);

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.container }]}>
        <Text style={[styles.title, { color: theme.text }]}>{t('members_shared_with')}</Text>

        {status === "loading" && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.text} />
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>{t('members_loading')}</Text>
          </View>
        )}

        {status === "ready" && memberList?.length === 0 && (
          <Text style={[styles.noMembersText, { color: theme.textSecondary }]}>{t('members_none')}</Text>
        )}

        {status === "ready" && memberList?.length > 0 && (
          <ScrollView style={styles.memberList}>
            {memberList.map((member, index) => (
              <View key={index} style={[styles.memberBox, { backgroundColor: theme.memberBox }]}>
                <Text style={[styles.memberText, { color: theme.text }]}>{member.name}: {member.email}</Text>

                {(userId === member._id.toString() || (userId === ownerId.toString() && member._id.toString() !== userId)) && (
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => { setSelectedMember(member); setIsOpen(true); }}
                  >
                    <Ionicons name="person-remove-outline" size={24} color={theme.btnConfirm} />
                  </Pressable>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <Modal visible={isOpen} transparent={true} animationType="fade">
        <View style={[styles.modalOverlay, { backgroundColor: theme.modalBackground }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.modalContent }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>
              {t('members_remove_confirm').replace("{member}", selectedMember?.name || "")}
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButtonConfirm, { backgroundColor: theme.btnConfirm }]} onPress={handleUnshare}>
                <Text style={[styles.modalButtonText, { color: theme.btnText }]}>{t('yes')}</Text>
              </Pressable>
              <Pressable style={[styles.modalButtonCancel, { backgroundColor: theme.btnCancel }]} onPress={() => setIsOpen(false)}>
                <Text style={[styles.modalButtonText, { color: theme.btnText }]}>{t('no')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10, padding: 10, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  loadingContainer: { marginTop: 20, alignItems: 'center' },
  loadingText: { marginTop: 10 },
  memberList: { maxHeight: 200 },
  memberBox: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  memberText: { fontSize: 16 },
  iconButton: { padding: 5 },
  noMembersText: { fontSize: 16, fontStyle: 'italic' },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContent: { padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', gap: 15 },
  modalButtonConfirm: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  modalButtonCancel: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  modalButtonText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
