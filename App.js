import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen'; // Import Home Page
import LoginScreen from './components/LoginScreen';
import ChooseDestinationScreen from './components/ChooseDestinationScreen';
import RideBookingScreen from './components/RideBookingScreen';
import MapScreen from './components/MapScreen';

const Stack = createStackNavigator(); // Create a stack navigator

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.welcome}>Welcome To</Text>
        <Text style={styles.smr}>Share My Ride !!</Text>
        <Text style={styles.subText}>For a Smart & Affordable Travel</Text>
      </View>

      {/* Button Navigates to Home Screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started...</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

// Main App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="chd" component={ChooseDestinationScreen} />
        <Stack.Screen name="RideBooking" component={RideBookingScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styling
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f5', alignItems: 'center', justifyContent: 'center' },
  textWrapper: { alignItems: 'center', marginBottom: 30 },
  welcome: { fontSize: 28, fontWeight: '400', color: '#333' },
  smr: { fontSize: 36, fontWeight: 'bold', color: '#ff6600' },
  subText: { fontSize: 18, color: '#555', textAlign: 'center', marginTop: 10 },
  button: { backgroundColor: '#ff6600', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, elevation: 3 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
