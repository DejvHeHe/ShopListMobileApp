import { 
  Pressable, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { register, login } from '../functions/userProvider';
import Toast from 'react-native-toast-message';
import { useColorMode } from '../functions/contexts/colorModeContext';
import { useLanguage } from '../functions/contexts/languageContext';

export default function RegisterPage() {
  const { colorMode } = useColorMode();
  const { t } = useLanguage();
  const navigation = useNavigation();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState(""); 
  const [registerFailed, setRegisterFailed] = useState(false);

  const onRegister = async () => { 
    if (password !== passwordAgain) {
      Toast.show({
        type: 'error',
        text1: t("passwords_not_match"),
        position: 'top',
      });
      setRegisterFailed(true);
      return;
    }

    setRegisterFailed(false);
    const data = { email, password, name };
    const registerResult = await register(data);

    if (registerResult.error) {     
      Toast.show({
        type:"error",
        text1: registerResult.message || t("register_error"),
        position:"top"
      });
    } else {
      await login({ email, password });
      navigation.navigate('Dashboard');
    }
  };

  const themeStyles = {
    backgroundColor: colorMode ? "#121212" : "#fff",
    textColor: colorMode ? "#fff" : "#000",
    inputBackground: colorMode ? "#1E1E1E" : "#fff",
    borderColor: colorMode ? "#444" : "#000",
    buttonBackground: colorMode ? "#00bfff" : "#000",
    buttonTextColor: "#fff",
    iconColor: "#00bfff"
  };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>

      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: themeStyles.textColor }]}>
          {t("sign_up")}
        </Text>
      </View>

      <View style={[styles.contentContainer, { backgroundColor: themeStyles.inputBackground, borderColor: themeStyles.borderColor }]}>

        <TextInput
          style={[styles.input, { color: themeStyles.textColor, backgroundColor: themeStyles.inputBackground, borderColor: themeStyles.borderColor }]}
          placeholder={t("name_placeholder")}
          placeholderTextColor={colorMode ? "#aaa" : "#555"}
          autoCapitalize="words"
          value={name}
          onChange={(e) => setName(e.nativeEvent.text)}
        />

        <TextInput
          style={[styles.input, { color: themeStyles.textColor, backgroundColor: themeStyles.inputBackground, borderColor: themeStyles.borderColor }]}
          placeholder={t("email_placeholder")}
          placeholderTextColor={colorMode ? "#aaa" : "#555"}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />

        <View style={[
          registerFailed ? styles.passwordInputContainerFailed : styles.passwordInputContainer,
          { borderColor: registerFailed ? "#FF0000" : themeStyles.borderColor, backgroundColor: themeStyles.inputBackground }
        ]}>
          <TextInput
            style={[styles.passwordInput, { color: themeStyles.textColor }]}
            placeholder={t("password_placeholder")}
            placeholderTextColor={colorMode ? "#aaa" : "#555"}
            secureTextEntry={!passwordVisibility}
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color={themeStyles.iconColor}
            />
          </TouchableOpacity>
        </View>

        <View style={[
          registerFailed ? styles.passwordInputContainerFailed : styles.passwordInputContainer,
          { borderColor: registerFailed ? "#FF0000" : themeStyles.borderColor, backgroundColor: themeStyles.inputBackground }
        ]}>
          <TextInput
            style={[styles.passwordInput, { color: themeStyles.textColor }]}
            placeholder={t("password_again_placeholder")}
            placeholderTextColor={colorMode ? "#aaa" : "#555"}
            secureTextEntry={!passwordVisibility}
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color={themeStyles.iconColor}
            />
          </TouchableOpacity>
        </View>

        <Pressable style={[styles.buttonPrimary, { backgroundColor: themeStyles.buttonBackground }]} onPress={onRegister}>
          <Text style={[styles.buttonText, { color: themeStyles.buttonTextColor }]}>
            {t("signup_button")}
          </Text>
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
    width: '100%',
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
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
    width: '100%',
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
  passwordInputContainerFailed: {
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
    fontWeight: '600',
  },
});
