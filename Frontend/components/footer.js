import { Pressable, StyleSheet, Text, View } from 'react-native';
import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import createFrom from './createForm';

export default function Footer() {
  const navigation = useNavigation();
  const [isOpen,setIsOpen]=useState(false)

  const openForm = () =>
  {
    setIsOpen(true)
  }
  useEffect(() => {
    openForm()
  });

  return (
    <View style={styles.footer}>
      <Pressable onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="home-outline" size={28} color="black" />
      </Pressable>

      <Pressable onPress={() => console.log('Add pressed')}>
        <Ionicons name="add-circle-outline" size={36} color="black" />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Archive')}>
        <Ionicons name="archive-outline" size={28} color="black" />
      </Pressable>
    </View>
    isOpen&&<createFrom onClose={()=>isOpen(false)}></createFrom>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});
