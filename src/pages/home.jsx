import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("@note-list");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes([]); // Clear state if no data is found
      }
    } catch (error) {
      console.error("Error loading notes: ", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.noteItem}
        onPress={() => navigation.navigate("NoteDetail", { noteId: item.id })}
      >
        <Text style={styles.noteText}>{item.travel}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Note")}>
        <Text style={styles.addButtonText}>Add Plan</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Withlist</Text>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Changed to item.id for uniqueness
        extraData={notes}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  addButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  noteItem: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  noteText: {
    justifyContent: "center",
    alignContent: "center",
    color: "white",
    alignItems: "center",
    fontSize: 18,
  },
});
