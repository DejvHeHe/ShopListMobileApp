import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { share } from '../functions/shopListProvider';
import Toast from 'react-native-toast-message';
import { useMemberList } from '../functions/contexts/memberListContext'; 
import { isMock } from '../IS_MOCK';
import { UsersMock } from '../UserMock';
import { useColorMode } from '../functions/contexts/colorModeContext';
import { useLanguage } from '../functions/contexts/languageContext'; // 🆕

export default function ShareForm({ shopListId, onClose }) {
  const [email, setEmail] = useState("");
  const { refreshMemberList } = useMemberList();
  const { colorMode } = useColorMode();
  const { t } = useLanguage(); // 🆕

  const theme = {
    background: colorMode ? '#1E1E1E' : '#fff',
    text: colorMode ? '#fff' : '#000',
    border: colorMode ? '#555' : '#000',
    buttonPrimary: colorMode ? '#00bfff' : '#000',
    buttonTextPrimary: '#fff',
    buttonCancelText: colorMode ? '#fff' : '#000',
    placeholder: colorMode ? '#aaa' : '#888',
  };

  const handleShare = async () => {
    try {
      if (isMock) {
        const user = UsersMock.find(u => u.email === email);
        if (!user) {
          Toast.show({ type: "error", text1: t('share_user_not_found') });
          return;
        }
        if (user.sharedShopList.includes(shopListId)) {
          Toast.show({ type: "error", text1: t('share_already_shared') });
          return;
        }
        user.sharedShopList.push(shopListId);
        Toast.show({ type: "success", text1: t('share_success') });
        await refreshMemberList(shopListId);
        onClose();
        return;
      }

      const data = { shopListId, email };
      const result = await share(data);

      if (result.error) {
        Toast.show({ type: 'error', text1: t('share_user_not_found'), text2: result.message });
        return;
      }

      Toast.show({ type: 'success', text1: t('share_success') });
      await refreshMemberList(shopListId);
      onClose();

    } catch (error) {
      console.log("Share form error:", error);
      Toast.show({ type: 'error', text1: 'Chyba', text2: error.message });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>{t('share_email_label')}</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        value={email}
        onChange={e => setEmail(e.nativeEvent.text)}
        placeholder={t('share_placeholder')}
        placeholderTextColor={theme.placeholder}
      />

      <Pressable
        style={[styles.button, !email && { opacity: 0.5 }, { backgroundColor: theme.buttonPrimary }]}
        onPress={handleShare}
        disabled={!email}
      >
        <Text style={[styles.buttonText, { color: theme.buttonTextPrimary }]}>{t('share_confirm')}</Text>
      </Pressable>

      <Pressable style={[styles.cancelButton, { borderColor: theme.border }]} onPress={onClose}>
        <Text style={[styles.cancelButtonText, { color: theme.buttonCancelText }]}>{t('share_cancel')}</Text>
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
