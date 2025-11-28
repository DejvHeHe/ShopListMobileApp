import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUserId } from '../functions/contexts/userIdContext';
import { useNavigation } from '@react-navigation/native';

export default function MockLoginPage() {
  const navigation = useNavigation();
  const { setUserId } = useUserId();
  const [selectedUser, setSelectedUser] = useState("user1");

  useEffect(() => {
    if (selectedUser) {
      setUserId(selectedUser);
      navigation.navigate("Dashboard");
    }
  }, [selectedUser]);

  return (
    <View style={styles.container}>

      <Pressable style={styles.button} onPress={() => setSelectedUser("user1")}>
        <Text style={styles.buttonText}>User1</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setSelectedUser("user2")}>
        <Text style={styles.buttonText}>User2</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
