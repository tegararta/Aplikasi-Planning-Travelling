import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const NoteDetails = () => {
  const [note, setNote] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const noteId = route.params?.noteId;

  // Memabggil kembali data yang telah diubah
  const loadNote = async () => {
    const storedNotes = await AsyncStorage.getItem("@note-list");
    if (storedNotes) {
      const notesArray = JSON.parse(storedNotes);
      const note = notesArray.find((n) => n.id === noteId);
      setNote(note);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNote();
    });

    return unsubscribe;
  }, [navigation]);

  const handleEdit = () => {
    // otomatis klik edit pada tombol edit pada note
    navigation.navigate("NoteEdit", { note: note });
  };

  const handleStatusChange = async () => {
    const storedNotes = await AsyncStorage.getItem("@note-list");
    if (storedNotes) {
      let notesArray = JSON.parse(storedNotes);

      // Find the note and update its status to "Done"
      const updatedNotesArray = notesArray.map((note) => {
        if (note.id === noteId) {
          return { ...note, status: "Done" };
        }
        return note;
      });

      // Filter out the completed note and remove its ID
      const completedNote = updatedNotesArray.find((note) => note.id === noteId && note.status === "Done");
      const completedNoteWithoutId = { ...completedNote };
      delete completedNoteWithoutId.id; // Remove the id from the completed note

      // Get the existing completed notes
      const storedCompletedNotes = await AsyncStorage.getItem("@completed-note-list");
      let completedNotes = storedCompletedNotes ? JSON.parse(storedCompletedNotes) : [];

      // Add the new completed note
      completedNotes.push(completedNoteWithoutId);

      // Filter out the completed notes from the original notes array
      const remainingNotes = updatedNotesArray.filter((note) => note.id !== noteId);

      // Update AsyncStorage with the new lists
      await AsyncStorage.setItem("@completed-note-list", JSON.stringify(completedNotes));
      await AsyncStorage.setItem("@note-list", JSON.stringify(remainingNotes));

      navigation.goBack();
    }
  };

  const handleDelete = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("@note-list");
      if (storedNotes) {
        let notesArray = JSON.parse(storedNotes);
        notesArray = notesArray.filter((n) => n.id !== noteId);
        await AsyncStorage.setItem("@note-list", JSON.stringify(notesArray));
        navigation.goBack();
      }
    } catch (error) {
      // Error deleting data
      console.log(error);
    }
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.task}>
      <Text style={styles.itemList}>
        <Text style={styles.itemLabel}>Tujuan Travelling: </Text>
        {note.travel}
      </Text>
      <Text style={styles.itemList}>
        <Text style={styles.itemLabel}>Budget: </Text>
        {note.budget}
      </Text>
      <Text style={styles.itemList}>
        <Text style={styles.itemLabel}>Kebutuhan Travelling: </Text>
        {note.barang}
      </Text>
      <Text style={styles.itemList}>
        <Text style={styles.itemLabel}>Tanggal: </Text>
        {note.ttl}
      </Text>

      <View style={styles.buttonsContainer}>
        <Ionicons name="pencil-outline" size={24} color="black" onPress={handleEdit} />
        <Ionicons name="trash-outline" size={24} color="red" onPress={handleDelete} />
        <Ionicons name="checkmark-circle-outline" size={24} color="green" onPress={handleStatusChange} />
      </View>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  task: {
    marginTop: 20,
    marginBottom: 15,
    padding: 32,
    borderRadius: 19,
    backgroundColor: "#8DCBF4", // Warna latar belakang diubah
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 5,
  },
  itemList: {
    fontSize: 19,
    marginBottom: 10,
  },
  itemLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Penyesuaian agar tombol lebih terlihat dan terpusat
  },
});
