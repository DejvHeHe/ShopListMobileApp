import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../functions/userProvider';
import Toast from 'react-native-toast-message';
import { useColorMode } from '../functions/contexts/colorModeContext';

export default function LoginPage() {
  const { colorMode } = useColorMode(); // true = dark, false = light
  const navigation = useNavigation();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const data = { email, password };
    const loginResult = await login(data);

    if (loginResult.error) {
      Toast.show({
        type: "error",
        text1: loginResult.message,
        position: "top",
      });    
    } else {
      navigation.navigate("Dashboard");
    }
  };

  // Dynamické barvy podle colorMode
  const themeStyles = {
    backgroundColor: colorMode ? "#121212" : "#F5F5F5",
    containerBackground: colorMode ? "#1E1E1E" : "#fff",
    textColor: colorMode ? "#fff" : "#000",
    inputBackground: colorMode ? "#1E1E1E" : "#fff",
    borderColor: colorMode ? "#444" : "#000",
    buttonPrimaryBackground: colorMode ? "#00bfff" : "#000",
    buttonPrimaryText: "#fff",
    buttonSecondaryBackground: colorMode ? "#333" : "#fff",
    buttonSecondaryText: colorMode ? "#fff" : "#000",
    iconColor: colorMode ? "#00bfff" : "#388E3C"
  };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: themeStyles.textColor }]}>Log in</Text>
      </View>

      <View style={[styles.contentContainer, { backgroundColor: themeStyles.containerBackground, borderColor: themeStyles.borderColor }]}>
        <TextInput
          style={[styles.input, { backgroundColor: themeStyles.inputBackground, borderColor: themeStyles.borderColor, color: themeStyles.textColor }]}
          placeholder='E-mail'
          placeholderTextColor={colorMode ? "#aaa" : "#555"}
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
        />

        <View style={[styles.passwordInputContainer, { backgroundColor: themeStyles.inputBackground, borderColor: themeStyles.borderColor }]}>
          <TextInput
            style={[styles.passwordInput, { color: themeStyles.textColor }]}
            placeholder='Password'
            placeholderTextColor={colorMode ? "#aaa" : "#555"}
            secureTextEntry={!passwordVisibility}
            value={password}
            onChange={e => setPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color={themeStyles.iconColor}
            />
          </TouchableOpacity>
        </View>

        <Pressable
          style={[styles.buttonPrimary, { backgroundColor: themeStyles.buttonPrimaryBackground }]}
          onPress={onLogin}
        >
          <Text style={[styles.buttonText, { color: themeStyles.buttonPrimaryText }]}>Log in</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.buttonSecondary, { backgroundColor: themeStyles.buttonSecondaryBackground, borderColor: themeStyles.borderColor }]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.secondaryButtonText, { color: themeStyles.buttonSecondaryText }]}>Create account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
  },
  contentContainer: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    gap: 15,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonPrimary: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "600",
  },
  buttonSecondary: {
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "600",
  },
  footer: {
    width: '100%',
    alignItems: "center",
    marginTop: 20,
  },
});
