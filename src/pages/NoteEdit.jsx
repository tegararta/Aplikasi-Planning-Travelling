import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const NoteEdit = () => {
  const [travelDestination, setTravelDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [travelNeeds, setTravelNeeds] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { note } = route.params;

  useEffect(() => {
    if (note) {
      setTravelDestination(note.travel);
      setBudget(note.budget);
      setTravelNeeds(note.barang);
      setTravelDate(note.ttl);
    }
  }, [note]);

  const updateNote = async () => {
    const allNotes = JSON.parse(await AsyncStorage.getItem('@note-list')) || [];
    const updatedNote = { ...note, travel: travelDestination, budget, barang: travelNeeds, ttl: travelDate };
    const updatedNotes = allNotes.map(n => n.id === note.id ? updatedNote : n);

    try {
      await AsyncStorage.setItem('@note-list', JSON.stringify(updatedNotes));
      navigation.goBack();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Your Planning</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tujuan Travelling</Text>
        <TextInput
          style={styles.input}
          value={travelDestination}
          onChangeText={setTravelDestination}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Budget</Text>
        <TextInput
          style={styles.input}
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Kebutuhan Travelling</Text>
        <TextInput
          style={styles.input}
          value={travelNeeds}
          onChangeText={setTravelNeeds}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tanggal</Text>
        <TextInput
          style={styles.input}
          value={travelDate}
          onChangeText={setTravelDate}
        />
      </View>
      <Button title="Update Note" onPress={updateNote} />
    </ScrollView>
  );
};

export default NoteEdit;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
  },
});
