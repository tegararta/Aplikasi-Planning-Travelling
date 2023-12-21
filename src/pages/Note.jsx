import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

const Note = () => {
  const [travelDestination, setTravelDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [travelNeeds, setTravelNeeds] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSaveNote = () => {
    if (editIndex !== null) {
      const editedNotes = [...savedNotes];
      editedNotes[editIndex] = `Tujuan Travelling: ${travelDestination}\nBudget: $${budget}\nKebutuhan Travelling: ${travelNeeds}\nTanggal: ${travelDate}`;
      setSavedNotes(editedNotes);
      setEditIndex(null);
    } else {
      const note = `Tujuan Travelling: ${travelDestination}\nBudget: $${budget}\nKebutuhan Travelling: ${travelNeeds}\nTanggal: ${travelDate}`;
      setSavedNotes([...savedNotes, note]);
    }

    setTravelDestination('');
    setBudget('');
    setTravelNeeds('');
    setTravelDate('');
  };

  const handleEditNote = (index) => {
    const noteToEdit = savedNotes[index];
    const noteParts = noteToEdit.split('\n');
    const destination = noteParts[0].split(': ')[1];
    const budgetValue = noteParts[1].split(': $')[1];
    const needs = noteParts[2].split(': ')[1];
    const date = noteParts[3].split(': ')[1];

    setTravelDestination(destination);
    setBudget(budgetValue);
    setTravelNeeds(needs);
    setTravelDate(date);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const editedNotes = [...savedNotes];
    editedNotes.splice(index, 1);
    setSavedNotes(editedNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Plan Your Travelling</Text>

      <TextInput
        style={styles.input}
        placeholder="Tujuan Travelling"
        value={travelDestination}
        onChangeText={(text) => setTravelDestination(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Budget (Rp.)"
        value={budget}
        onChangeText={(text) => setBudget(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Kebutuhan Travelling"
        value={travelNeeds}
        onChangeText={(text) => setTravelNeeds(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tanggal (dd/mm/yyyy)"
        value={travelDate}
        onChangeText={(text) => setTravelDate(text)}
      />

      <Button title={editIndex !== null ? 'Update' : 'Save'} onPress={handleSaveNote} color="#3498db" />

      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Note Travelling Anda</Text>
        <ScrollView>
          {savedNotes.map((note, index) => (
            <View key={index} style={styles.noteItem}>
              <Text style={styles.noteText}>{note}</Text>
              <View style={styles.noteButtons}>
                <Button title="Edit" onPress={() => handleEditNote(index)} color="#27ae60" />
                <Button title="Delete" onPress={() => handleDeleteNote(index)} color="#e74c3c" />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  notesContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#bdc3c7',
    paddingTop: 10,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  noteItem: {
    marginBottom: 20,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  noteText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
  },
  noteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
