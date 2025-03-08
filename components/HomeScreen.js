import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import car from '../assets/car.png';
import destIcon from '../assets/destination.png';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>

        {/* Destination Search */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('chd')}>
        <FontAwesome5 name="search" size={18} color="gray" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput placeholder="Where to?" style={styles.searchInput} />
        <Ionicons name="time-outline" size={18} color="gray" style={styles.clockIcon} />
      </View>

      {/* Banner Section */}
      <View style={styles.banner}>
        <Image source={destIcon} style={styles.bannerImage} />
        <Text style={styles.bannerText}>Your journey starts here.</Text>
        <Text style={styles.subText}>Just sit back and relax</Text>
      </View>

      {/* Car Selection */}
      <View style={styles.carSelection}>
        <TouchableOpacity style={styles.carOption}>
          <Image source={car} style={styles.carImage} />
          <Text>Standard 4-seat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carOption}>
          <Image source={car} style={styles.carImage} />
          <Text>Premium 4-seat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carOption}>
          <Image source={car} style={styles.carImage} />
          <Text>Standard 6-seat</Text>
        </TouchableOpacity>
      </View>

      

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="bookmark-outline" size={20} color="black" />
          <Text>Choose a saved place</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text>Set destination on map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Ionicons name="people-outline" size={20} color="black" />
          <Text>Request a ride for someone else</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="gray" />
          <Text style={styles.inactiveText}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.inactiveText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  banner: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
  },
  carSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  carOption: {
    alignItems: 'center',
  },
  carImage: {
    width: 60,
    height: 40,
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clockIcon: {
    marginLeft: 10,
  },
  quickActions: {
    marginBottom: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  inactiveText: {
    color: 'gray',
  },
});
