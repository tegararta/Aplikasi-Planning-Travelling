import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const History = ({ route }) => {
  const { undoneNote, savedNotes } = route.params;
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (undoneNote) {
      setCompletedTasks((prevTasks) => [...prevTasks, undoneNote]);
    }
  }, [undoneNote]);

  const getNoteValue = (note, label) => {
    const regex = new RegExp(`${label}: (.+)`);
    const match = note.match(regex);
    return match ? match[1] : '';
  };

  const handleDelete = async (index) => {
    const updatedTasks = [...completedTasks];
    const deletedNote = updatedTasks.splice(index, 1)[0];
    setCompletedTasks(updatedTasks);

    await saveDataToAsyncStorage(updatedTasks);

    await new Promise((resolve) => setTimeout(resolve, 100));

    navigation.navigate('Note');
  };

  const handleUndone = async (index) => {
    const updatedTasks = [...completedTasks];
    const undoneNote = updatedTasks.splice(index, 1)[0];
    setCompletedTasks(updatedTasks);

    const savedNotes = await getDataFromAsyncStorage('savedNotes');
    const updatedSavedNotes = [...savedNotes, undoneNote];
    await saveDataToAsyncStorage(updatedSavedNotes);

    navigation.navigate('Note', { undoneNote, savedNotes: updatedSavedNotes });
  };

  const saveDataToAsyncStorage = async (data) => {
    try {
      await AsyncStorage.setItem('completedTasks', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const getDataFromAsyncStorage = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting data from AsyncStorage:', error);
      return [];
    }
  };

  const renderNoteItem = ({ item, index }) => {
    const tujuanTravelling = getNoteValue(item, 'Tujuan Travelling');
    const budget = getNoteValue(item, 'Budget');
    const kebutuhanTravelling = getNoteValue(item, 'Kebutuhan Travelling');
    const tanggal = getNoteValue(item, 'Tanggal');
  
    return (
      <View style={styles.task}>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Tujuan Travelling:</Text> {tujuanTravelling}
        </Text>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Budget:</Text> {budget}
        </Text>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Kebutuhan Travelling:</Text> {kebutuhanTravelling}
        </Text>
        <Text style={styles.itemList}>
          <Text style={styles.itemLabel}>Tanggal:</Text> {tanggal}
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            title="Delete"
            onPress={() => handleDelete(index)}
            color="#e74c3c"
          />
          <Button
            title="Undone"
            onPress={() => handleUndone(index)}
            color="#3498db"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Riwayat Destinasi</Text>
      <FlatList
        data={completedTasks}
        renderItem={renderNoteItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
  },
  task: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#8DCBF4', // Warna latar belakang diubah
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
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
