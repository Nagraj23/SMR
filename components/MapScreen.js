import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import polyline from '@mapbox/polyline';
import * as Location from 'expo-location'; // Use expo-location instead of react-native-permissions

const API_KEY = 'AIzaSyBfQKarm1Xqsbd137c0OQ1X4EFay1Btk_A';
Geocoder.init(API_KEY);

const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState('');
  const {ride,start , end }=route.params;



  useEffect(() => {
    const fetchLocationAndRoute = async () => {
      try {
        // Request location permissions using expo-location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required.');
          return;
        }

        // Get current location
        let location = await Location.getCurrentPositionAsync({});
        const userLoc = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setUserLocation(userLoc);
        setSourceCoords(userLoc);

        // Fetch coordinates for locations
        const sourceRes = await Geocoder.from(start);
        const sourceLoc = sourceRes.results[0].geometry.location;
        setSourceCoords({ latitude: sourceLoc.lat, longitude: sourceLoc.lng });

        const destRes = await Geocoder.from(end);
        const destLoc = destRes.results[0].geometry.location;
        setDestinationCoords({ latitude: destLoc.lat, longitude: destLoc.lng });

        fetchRoute(sourceLoc, destLoc);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch location');
      }
    };

    fetchLocationAndRoute();
  }, []);

  const fetchRoute = async (source, destination) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${source.lat},${source.lng}&destination=${destination.lat},${destination.lng}&key=${API_KEY}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.routes.length > 0) {
        const routeData = json.routes[0];
        const leg = routeData.legs[0];

        setDistance(`Distance: ${(leg.distance.value / 1000).toFixed(2)} km`);
        setPrice(`Estimated Price: ₹${(leg.distance.value / 1000 * 10).toFixed(2)}`);

        // Decode polyline
        const decodedPolyline = polyline.decode(routeData.overview_polyline.points);
        const routeCoords = decodedPolyline.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setRouteCoords(routeCoords);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch route');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 20.5937,
          longitude: userLocation?.longitude || 78.9629,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {sourceCoords && <Marker coordinate={sourceCoords} title="Your Location" />}
        {destinationCoords && <Marker coordinate={destinationCoords} title="Destination" />}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />}
      </MapView>

      <View style={styles.detailsContainer}>
        <Text style={styles.info}>{ride.icon} {ride.type} - ₹{ride.price.toFixed(2)}</Text>
        <Text style={styles.info}>{distance}</Text>
        <Text style={styles.info}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  detailsContainer: { padding: 10, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  info: { fontSize: 16, marginVertical: 5 },
});

export default MapScreen;
