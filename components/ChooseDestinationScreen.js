import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Change to "react-native-vector-icons/Ionicons" if NOT using Expo

export default function ChooseDestinationScreen({ navigation }) {
  const [start , Setstart] = useState("");
  const [end , Setend] = useState("");

  // Dummy Data for Saved & Frequent Places
  const savedPlaces = [
    { id: "1", name: "Work", address: "1671 North Avenue, Tucson, AZ", distance: "2.3km", icon: "briefcase-outline" },
    { id: "2", name: "Home", address: "1234 Desert Road, Tucson, AZ", distance: "4.3km", icon: "home-outline" },
  ];
  
  const frequentDestinations = [
    { id: "1", name: "Long Beach", address: "639 South Street, Apt. 7A", distance: "1.3km", icon: "location-outline" },
    { id: "2", name: "Downtown", address: "245 Market Street, Tucson, AZ", distance: "2.5km", icon: "location-outline" },
  ];

  return (
    <View style={styles.container}>
      {/* Back Button & Input Fields */}
      <View style={styles.searchContainer}>
  
        <View style={styles.inputContainer}>
          <Ionicons name="navigate-outline" size={20} color="black" />
          <TextInput placeholder="Current Location... "
          onChangeText={(text) => Setstart(text)}  // ✅ Correct: Pass only serializable text
          value={start} 
          style={styles.input}  />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={20} color="black" />
        <TextInput placeholder="Where to go..." 
         onChangeText={(text) => Setend(text)}  // ✅ Fix here too
         value={end}  style={styles.input} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideBooking',{start,end})}>
        <Text style={styles.buttonText}> Find A Ride</Text>
      </TouchableOpacity>

      {/* Saved Places Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Saved places</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={savedPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.locationItem}>
            <Ionicons name={item.icon} size={24} color="black" />
            <View style={styles.locationText}>
              <Text style={styles.locationName}>{item.name} <Text style={styles.distance}>{item.distance}</Text></Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
            <Ionicons name="create-outline" size={20} color="gray" />
          </TouchableOpacity>
        )}
      />

      {/* Add New Location */}
      <TouchableOpacity style={styles.addNew} onPress={() => navigation.navigate('AddLocationScreen')}>
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Text style={styles.addNewText}>Add New</Text>
      </TouchableOpacity>

      {/* Frequent Destinations */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Frequent destinations</Text>
      </View>

      <FlatList
        data={frequentDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.locationItem}>
            <Ionicons name={item.icon} size={24} color="black" />
            <View style={styles.locationText}>
              <Text style={styles.locationName}>{item.name} <Text style={styles.distance}>{item.distance}</Text></Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// 🔥 Styling
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, top: 20 },
  searchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 0 },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f0f0f0", padding: 12, borderRadius: 10, marginBottom: 10 },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  button: { backgroundColor: '#ff6600', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  viewAll: { fontSize: 14, color: "#007AFF" },
  locationItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, borderColor: "#ddd", borderWidth: 1 },
  locationText: { flex: 1, marginLeft: 10 },
  locationName: { fontSize: 16, fontWeight: "bold" },
  distance: { fontSize: 14, color: "gray" },
  address: { fontSize: 14, color: "gray" },
  addNew: { flexDirection: "row", alignItems: "center", marginTop: 10, padding: 15 },
  addNewText: { fontSize: 16, marginLeft: 10, color: "#007AFF" },
});

