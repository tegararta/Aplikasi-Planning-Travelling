import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  // Mengambil data dari AsyncStorage
  const [savedNotes, setSavedNotes] = useState([]);

  const clear = async () => {
    Alert.alert(
        "Clear Data",
        "Are you sure to clear all data?",
        [
            {
                text: "Cancel"
            },
            {
                text: "Clear",
                onPress: async () => {
                    try {
                        await AsyncStorage.clear();
                        console.log('Data cleared');
                    } catch (e) {
                        console.log('Error clear data: in about.js');
                        console.error(e.message);
                    }
                }
            }
        ]
    );
};

const getStorageData = async () => {
  try {
      const value = await AsyncStorage.getItem('@completed-note-list');
      if (value !== null) {
          const allData = JSON.parse(value);
          return allData;
      } else {
          return [];
      }
  } catch (e) {
      console.error('Error retrieving data:', e);
      return [];
  }
};

const getTaskList = async () => {
  const allNotes = await getStorageData();
  setSavedNotes(allNotes);
};


useEffect(
  useCallback(() => {
    getTaskList();
  }, [])
);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.task}>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Tujuan Travelling: </Text>
          {item.travel}
        </Text>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Budget: </Text>
          {item.budget}
        </Text>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Kebutuhan Travelling: </Text>
          {item.barang}
        </Text>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Tanggal: </Text>
          {item.ttl}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text >Kenangan Anda</Text>
      {/* <Button title="Clear Data" onPress={clear} /> */}
      <FlatList
        data={savedNotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  heading: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
  },
  task: {
    marginTop: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#8DCBF4', // Warna latar belakang diubah
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    opacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  itemList: {
    fontSize: 19,
    marginBottom: 10,
  },
  itemLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Penyesuaian agar tombol lebih terlihat dan terpusat
  },
});

export default History;
