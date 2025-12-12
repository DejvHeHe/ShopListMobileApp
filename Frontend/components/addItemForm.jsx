import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { addItem } from '../functions/shopListProvider';
import Toast from 'react-native-toast-message';
import { useShopListDetail } from '../functions/contexts/shopListDetailContext';
import { isMock } from '../IS_MOCK';
import { ShopListsMock } from '../ShopListMock';
import { useColorMode } from '../functions/contexts/colorModeContext';
import { useLanguage } from '../functions/contexts/languageContext'; // 🆕

export default function AddItemForm({ onClose }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const { shopList, refresh } = useShopListDetail();
  const { colorMode } = useColorMode();
  const { t } = useLanguage(); // 🆕

  const theme = {
    containerBg: colorMode ? '#222' : '#fff',
    label: colorMode ? '#fff' : '#000',
    inputBg: colorMode ? '#333' : '#fff',
    inputText: colorMode ? '#fff' : '#000',
    placeholder: colorMode ? '#aaa' : '#888',
    buttonBg: '#000',
    buttonText: '#fff',
    cancelBorder: colorMode ? '#fff' : '#000',
    cancelText: colorMode ? '#fff' : '#000',
  };

  const handleAddItem = async () => {
    if (count < 1) {
      Toast.show({ type: "error", text1: t('additemform_error'), text2: t('additemform_invalid_count') });
      return;
    }

    try {
      if (isMock) {
        const list = ShopListsMock.find(l => l._id === shopList._id);
        if (list) {
          if (!list.items) list.items = [];
          const lastId = list.items.length > 0 ? Math.max(...list.items.map(i => i._id)) : 0;
          list.items.push({ _id: lastId + 1, name, count, state: "unchecked" });
        }
        Toast.show({ type: 'success', text1: t('additemform_success_mock') });
        await refresh();
        onClose();
        return;
      }

      const data = { shopListId: shopList._id, itemName: name, count };
      const result = await addItem(data);

      if (result.error) {
        Toast.show({ type: 'error', text1: t('additemform_error'), text2: result.message });
        return;
      }

      Toast.show({ type: 'success', text1: t('additemform_success') });
      await refresh();
      onClose();
    } catch (error) {
      console.log("AddItemForm error:", error);
      Toast.show({ type: 'error', text1: t('additemform_error'), text2: error.message });
    }
  };

  if (!shopList) return <Text style={{ color: theme.label }}>{t('additemform_loading')}</Text>;

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
      <Text style={[styles.label, { color: theme.label }]}>{t('additemform_label_name')}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.inputText }]}
        value={name}
        onChange={e => setName(e.nativeEvent.text)}
        placeholder={t('additemform_placeholder_name')}
        placeholderTextColor={theme.placeholder}
      />
      <Text style={[styles.label, { color: theme.label }]}>{t('additemform_label_count')}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBg, color: theme.inputText }]}
        value={count.toString()}
        keyboardType="numeric"
        onChange={e => {
          const val = parseInt(e.nativeEvent.text, 10);
          setCount(isNaN(val) ? 0 : val);
        }}
      />

      <Pressable
        style={[styles.button, !name && { opacity: 0.5 }, { backgroundColor: theme.buttonBg }]}
        onPress={handleAddItem}
        disabled={!name}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>{t('additemform_confirm')}</Text>
      </Pressable>

      <Pressable style={[styles.cancelButton, { borderColor: theme.cancelBorder }]} onPress={onClose}>
        <Text style={[styles.cancelButtonText, { color: theme.cancelText }]}>{t('additemform_cancel')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, borderRadius: 12, margin: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#000', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12, fontSize: 16, marginBottom: 20 },
  button: { paddingVertical: 14, borderRadius: 10, marginBottom: 10 },
  buttonText: { textAlign: 'center', fontSize: 16, fontWeight: '600' },
  cancelButton: { borderWidth: 1, paddingVertical: 14, borderRadius: 10 },
  cancelButtonText: { textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
