import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { update } from '../functions/shopListProvider';
import Toast from 'react-native-toast-message';
import { useShopList } from '../functions/contexts/shopListContext';


export default function UpdateShopListNameForm({ shopList,onClose }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const { shopLists, refresh } = useShopList();

  const handleUpdateShopLIstName = async () => {
    try {
      const data = { shopListId:shopList._id,
            newName:name,};
      
        const result = await update(data);

      if (result.error) {
        Toast.show({ type: 'error', text1: 'Chyba', text2: result.message });
        return;
      }

      Toast.show({ type: 'success', text1: 'Hotovo', text2: 'Jmeno byl aktualizovano' });
      await refresh()
      onClose();
    } catch (error) {
      console.log("Create form error:", error);
      Toast.show({ type: 'error', text1: 'Chyba', text2: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nové jméno:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChange={e => setName(e.nativeEvent.text)}


      />
      
      <Pressable
        style={[styles.button, !name && { opacity: 0.5 }]}
        onPress={handleUpdateShopLIstName}
        disabled={!name}
      >
        <Text style={styles.buttonText}>Potvrdit</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Zrušit</Text>
      </Pressable>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
