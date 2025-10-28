import { Pressable, StyleSheet, Text, TextInput, View,ScrollView } from 'react-native';
import React, { useState } from 'react';


export default function ShopList({shopList}) {  

  return (
    <View>
      <Text>{shopList.name}</Text>
    </View>
    
  );
}

