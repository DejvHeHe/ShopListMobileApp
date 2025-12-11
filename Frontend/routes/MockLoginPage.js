import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUserId } from '../functions/contexts/userIdContext';
import { useNavigation } from '@react-navigation/native';
import { useColorMode } from '../functions/contexts/colorModeContext';

export default function MockLoginPage() {
  const navigation = useNavigation();
  const { setUserId } = useUserId();
  const { colorMode } = useColorMode(); // true = dark, false = light
  const [selectedUser, setSelectedUser] = useState("user1");

  useEffect(() => {
    if (selectedUser) {
      setUserId(selectedUser);
      navigation.navigate("Dashboard");
    }
  }, [selectedUser]);

  // Dynamické barvy podle colorMode
  const themeStyles = {
    backgroundColor: colorMode ? "#121212" : "#F5F5F5",
    buttonBackground: colorMode ? "#00bfff" : "#000",
    buttonTextColor: "#fff",
  };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>

      <Pressable
        style={[styles.button, { backgroundColor: themeStyles.buttonBackground }]}
        onPress={() => setSelectedUser("user1")}
      >
        <Text style={[styles.buttonText, { color: themeStyles.buttonTextColor }]}>User1</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: themeStyles.buttonBackground }]}
        onPress={() => setSelectedUser("user2")}
      >
        <Text style={[styles.buttonText, { color: themeStyles.buttonTextColor }]}>User2</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
