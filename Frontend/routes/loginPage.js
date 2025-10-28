import { Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../functions/api';
import Toast from 'react-native-toast-message';

export default function LoginPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigation = useNavigation();
  const [email,setEmail]=useState("");  
  const[password,setPassword]=useState("");

  const onLogin = async() =>
  {
    const data={
      email:email,
      password:password
    }
    const loginResult= await login(data);
    if(loginResult.error)
    {
      Toast.show({
        type:"error",
        text1:loginResult.message,
        position:"top",    
      })    


    }
    else{
      navigation.navigate("Dashboard")

    }
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 30 }}>Log in</Text>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder='Password'
            secureTextEntry={!passwordVisibility}
            value={password}
            onChange={e => setPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisibility(!passwordVisibility)}>
            <Ionicons
              name={passwordVisibility ? 'eye-off' : 'eye'}
              size={24}
              color="#388E3C"
            />
          </TouchableOpacity>
        </View>

        <Pressable style={styles.buttonPrimary} onPress={onLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Create account</Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // světle šedé pozadí
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000', // černý rámeček
    borderRadius: 12,
    padding: 20,
    gap: 15,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  buttonPrimary: {
    backgroundColor: '#000', // černé tlačítko
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
  },
  buttonSecondary: {
    backgroundColor: '#fff', // bílé tlačítko s černým rámečkem
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#000', // černý text (na bílém i černém tlačítku se dá upravit dynamicky)
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "600",
  },
  footer: {
    width: '100%',
    alignItems: "center",
    marginTop: 20,
  },
  forgotPassword: {
    marginTop: 10,
    alignItems: "center",
  },
});
