import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { update } from '../functions/shopListProvider';
import Toast from 'react-native-toast-message';
import { useShopList } from '../functions/contexts/shopListContext';
import { isMock } from '../IS_MOCK';
import { ShopListsMock } from '../ShopListMock';
import { useColorMode } from '../functions/contexts/colorModeContext';
import { useLanguage } from '../functions/contexts/languageContext'; // 🆕 

export default function UpdateShopListNameForm({ shopList, onClose }) {
  const [name, setName] = useState("");
  const { refresh } = useShopList();
  const { colorMode } = useColorMode();
  const { t } = useLanguage(); // 🆕  

  const theme = {
    background: colorMode ? '#1E1E1E' : '#fff',
    text: colorMode ? '#fff' : '#000',
    border: colorMode ? '#555' : '#000',
    buttonPrimary: colorMode ? '#00bfff' : '#000',
    buttonTextPrimary: '#fff',
    buttonCancelText: colorMode ? '#fff' : '#000',
  };

  const handleUpdateShopListName = async () => {
    try {
      if (isMock) {
        const mockList = ShopListsMock.find(l => l._id === shopList._id);
        if (mockList) mockList.name = name;

        Toast.show({ type: 'success', text1: t('update_success_mock') });
        await refresh();
        onClose();
        return;
      }

      const data = { shopListId: shopList._id, newName: name };
      const result = await update(data);

      if (result.error) {
        Toast.show({ type: 'error', text1: t('update_error'), text2: result.message });
        return;
      }

      Toast.show({ type: 'success', text1: t('update_success') });
      await refresh();
      onClose();
    } catch (error) {
      console.log("UpdateShopListNameForm error:", error);
      Toast.show({ type: 'error', text1: t('update_error'), text2: error.message });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>{t('update_label')}</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        value={name}
        onChange={e => setName(e.nativeEvent.text)}
      />
      
      <Pressable
        style={[styles.button, !name && { opacity: 0.5 }, { backgroundColor: theme.buttonPrimary }]}
        onPress={handleUpdateShopListName}
        disabled={!name}
      >
        <Text style={[styles.buttonText, { color: theme.buttonTextPrimary }]}>{t('update_confirm')}</Text>
      </Pressable>

      <Pressable style={[styles.cancelButton, { borderColor: theme.border }]} onPress={onClose}>
        <Text style={[styles.cancelButtonText, { color: theme.buttonCancelText }]}>{t('update_cancel')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
