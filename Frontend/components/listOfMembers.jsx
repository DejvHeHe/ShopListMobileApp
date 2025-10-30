import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { viewSharedTo } from '../functions/shopListProvider';

export default function ListOfMembers({ shopListId }) {
  const [listOfMembers, setListOfMembers] = useState([]);

  const getListOfMembers = async () => {
    try {
      const data = { shopListId };
      const list = await viewSharedTo(data);
      setListOfMembers(list);
    } catch (err) {
      console.error("Chyba při načítání členů:", err);
    }
  };

  useEffect(() => {
    if (shopListId) {
      getListOfMembers();
    }
  }, [shopListId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sdíleno s:</Text>
      {listOfMembers && listOfMembers.length > 0 ? (
        <ScrollView style={styles.memberList}>
          {listOfMembers.map((member, index) => (
            <View key={index} style={styles.memberBox}>
              <Text style={styles.memberText}>{member.name}:{member.email}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noMembersText}>Žádní členové</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  memberList: {
    maxHeight: 200,
  },
  memberBox: {
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  memberText: {
    color: '#fff',
    fontSize: 16,
  },
  noMembersText: {
    color: '#aaa',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
