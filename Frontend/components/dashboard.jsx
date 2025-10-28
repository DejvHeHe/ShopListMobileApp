import { ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import ShopList from './shopList';

export default function Dashboard({ listFunction }) {
  const [shopLists, setShopLists] = useState([]);

  const getShopList = async () => {
    try {
      const lists = await listFunction();
      setShopLists(Array.isArray(lists) ? lists : []);
    } catch (error) {
      console.error("Error during list:", error);
      setShopLists([]);
    }
  };

  useEffect(() => {    
    getShopList();
    
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {shopLists.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Žádné seznamy</Text>
      ) : (
      shopLists.map(list => {
        console.log("Seznam je",list); // vypíše do konzole
        return <ShopList key={list._id} shopList={list} />;
      })


      )}
    </ScrollView>
  );
}



