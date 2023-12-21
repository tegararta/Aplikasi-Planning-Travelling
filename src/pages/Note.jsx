import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Note = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [travelDestination, setTravelDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [travelNeeds, setTravelNeeds] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [doneNotes, setDoneNotes] = useState([]);

  // Fungsi untuk menavigasi ke laman history
  const navigateToHistory = (params) => {
    navigation.navigate('History', params);
  };

  useEffect(() => {
    // Cek apakah ada data editNote dari properti route.params
    const { editNote, editIndex } = route.params || {};
    if (editNote && editIndex !== undefined) {
      // Mengisi state dengan data dari editNote
      const noteParts = editNote.split('\n');
      const destination = noteParts[0].split(': ')[1];
      const budgetValue = noteParts[1].split(': Rp.')[1];
      const needs = noteParts[2].split(': ')[1];
      const date = noteParts[3].split(': ')[1];

      setTravelDestination(destination);
      setBudget(budgetValue);
      setTravelNeeds(needs);
      setTravelDate(date);
      setEditIndex(editIndex);
    }
  }, [route.params]);

  const overallBackgroundColor = '#2793D8';

  const handleSaveNote = () => {
    if (editIndex !== null) {
      const editedNotes = [...savedNotes];
      editedNotes[editIndex] = `Tujuan Travelling: ${travelDestination}\nBudget: Rp.${budget}\nKebutuhan Travelling: ${travelNeeds}\nTanggal: ${travelDate}`;
      setSavedNotes(editedNotes);
      setEditIndex(null);
    } else {
      const note = `Tujuan Travelling: ${travelDestination}\nBudget: Rp.${budget}\nKebutuhan Travelling: ${travelNeeds}\nTanggal: ${travelDate}`;
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

  const formatCurrency = (value) => {
    // Format angka ke format mata uang Rupiah
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getNoteValue = (note, label) => {
    const regex = new RegExp(`${label}: (.+)`);
    const match = note.match(regex);
    return match ? match[1] : '';
  };

  const NoteRow = ({ label, value }) => (
    <View style={styles.noteRow}>
      <Text style={styles.noteLabel}>{label}:</Text>
      {label === 'Budget' ? (
        <Text style={styles.noteValue}>{value.includes('') ? value : `Rp.${value}`}</Text>
      ) : (
        <Text style={styles.noteValue}>{value}</Text>
      )}
    </View>
  );
  

  const handleUndone = (index, note) => {
    // Hapus dari doneNotes
    const updatedDoneNotes = [...doneNotes];
    updatedDoneNotes.splice(index, 1);
    setDoneNotes(updatedDoneNotes);
  
    // Tambahkan kembali ke savedNotes
    setSavedNotes((prevNotes) => [...prevNotes, note]);
  
    // Navigasi kembali ke laman Note
    navigation.navigate('Note');
  };
  const handleDoneNote = (index) => {
    const editedNotes = [...savedNotes];
    const deletedNote = editedNotes.splice(index, 1)[0];
    setSavedNotes(editedNotes);

    // Navigasi ke layar history dengan menyertakan data doneNote
    navigateToHistory({ doneNote: deletedNote });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Plan Your Travelling</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tujuan Travelling</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            placeholder="Kota"
            value={travelDestination}
            onChangeText={(text) => setTravelDestination(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Budget (Rp.)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            placeholder="Rp."
            value={budget}
            onChangeText={(text) => setBudget(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Kebutuhan Travelling</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            placeholder="Barang"
            value={travelNeeds}
            onChangeText={(text) => setTravelNeeds(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tanggal</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            placeholder="dd/mm/yyyy"
            value={travelDate}
            onChangeText={(text) => setTravelDate(text)}
          />
        </View>

        <Button title={editIndex !== null ? 'Update' : 'Save'} onPress={handleSaveNote} color="#3498db" />

        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Note Travelling Anda</Text>
          <FlatList
            data={savedNotes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.noteItem, { backgroundColor: 'white' }]}>
                <NoteRow label="Tujuan Travelling" value={getNoteValue(item, 'Tujuan Travelling')} />
                <NoteRow label="Budget" value={`${getNoteValue(item, 'Budget')}`} />
                <NoteRow label="Kebutuhan Travelling" value={getNoteValue(item, 'Kebutuhan Travelling')} />
                <NoteRow label="Tanggal" value={getNoteValue(item, 'Tanggal')} />
                <View style={styles.noteButtonsContainer}>
                  <View style={styles.noteButton}>
                    <Button title="Edit" onPress={() => handleEditNote(index)} color="#3498db" />
                  </View>
                  <View style={styles.noteButton}>
                    <Button title="Done" onPress={() => handleDoneNote(index)} color="#e74c3c" />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ecf0f1',
    overallBackgroundColor: '#2793D8',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 5,
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
  noteRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  noteLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    width: 120, // Sesuaikan lebar label sesuai kebutuhan
  },
  noteValue: {
    flex: 1,
    color: '#2c3e50',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#bdc3c7',
    marginHorizontal: 5,
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
  noteButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Note;