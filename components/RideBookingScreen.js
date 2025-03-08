import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from "@expo/vector-icons";
import Geocoder from 'react-native-geocoding';
import { API_KEY } from '@env';

// Google Maps API Key
const API_KEY =API_KEY;
Geocoder.init(API_KEY);

const RideBookingScreen = ({ navigation , route }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const {start , end }=route.params;

  const rideOptions = [
    { id: '1', type: 'Standard 4-seat', price: 12.32, time: '4:23PM - 6 min away', icon: '🚗' },
    { id: '2', type: 'Premium 4-seat', price: 22.32, time: '4:26PM - 8 min away', icon: '🚘' },
    { id: '3', type: 'Standard 6-seat', price: 16.32, time: '4:20PM - 3 min away', icon: '🚙' },
    { id: '4', type: 'VIP', price: 28.50, time: '4:23PM - 6 min away', icon: '🚖' },
  ];

  useEffect(() => {
    (async () => {
      // Get user's live location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => Alert.alert('Error', error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );

      
      try {
        // Get source location coordinates (Solapur)
        const srcResponse = await Geocoder.from(start);
        const srcLocation = srcResponse.results[0].geometry.location;
        setUserLocation({ latitude: srcLocation.lat, longitude: srcLocation.lng });

        // Get destination location coordinates (Pune)
        const destResponse = await Geocoder.from(end);
        const destLocation = destResponse.results[0].geometry.location;
        setDestinationCoords({ latitude: destLocation.lat, longitude: destLocation.lng });
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch location data');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 17.6599, // Default to Solapur
          longitude: userLocation?.longitude || 75.9064,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="Your Location" />
        )}
        {destinationCoords && (
          <Marker coordinate={destinationCoords} title="Destination" />
        )}
      </MapView>

      {/* Ride Options */}
      <View style={styles.rideContainer}>
        <FlatList
          data={rideOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.rideOption,
                selectedRide === item.id && styles.selectedRide,
              ]}
              onPress={() => setSelectedRide(item.id)}
            >
              <Text style={styles.rideText}>{item.icon} {item.type}</Text>
              <Text style={styles.rideText}>₹{item.price.toFixed(2)}</Text>
              <Text style={styles.rideSubText}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Book Now Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => {
          const ride = rideOptions.find((r) => r.id === selectedRide);
          if (ride) {
            navigation.navigate('MapScreen', { ride , start , end });
          } else {
            Alert.alert('Please select a ride');
          }
        }}
      >
        <Text style={styles.bookText}>Book Now</Text>
        <Ionicons name="arrow-forward" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 2 },
  rideContainer: { flex: 1, backgroundColor: '#fff', padding: 10 },
  rideOption: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  selectedRide: { backgroundColor: '#e0e0e0' },
  rideText: { fontSize: 16, fontWeight: 'bold' },
  rideSubText: { fontSize: 12, color: 'gray' },
  bookButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  bookText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 5 },
});

export default RideBookingScreen;
