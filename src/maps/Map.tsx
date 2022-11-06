import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { base, colors } from '../utils/base';
import auth from '@react-native-firebase/auth';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from '../utils/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import MapInfo from './MapInfo';

interface IProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Map = (props: IProps) => {
  const { setIsAuthenticated } = props;
  const [userRegion, setUserRegion] = useState<Region | undefined>(undefined);

  useEffect(() => {
    const getPermission = async () => {
      const hasPermission = await hasLocationPermission();
      if (hasPermission) {
        await getCurrentPosition();
      }
    };
    getPermission();
  }, []);

  return (
    <View style={[{ flexDirection: 'column' }]}>
      <View style={[base.flex]}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={userRegion}>
          {userRegion && (
            <Marker key={'user'} coordinate={userRegion}>
              <Icon2 name="running" size={30} color={colors.dark} />
            </Marker>
          )}
          <Marker key={'scooter'} coordinate={{ latitude: 59.4200867, longitude: 24.765405 }}>
            <Icon name="scooter" size={30} color={colors.dark} />
          </Marker>
        </MapView>

        <MapInfo />
      </View>

      <TouchableHighlight
        style={[base.mt5, styles.logout]}
        underlayColor={colors.tertiary}
        onPress={logOut}
      >
        <Icon name="logout" size={34} color={colors.primary} />
      </TouchableHighlight>
    </View>
  );

  async function logOut() {
    setIsAuthenticated(false);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  async function getCurrentPosition() {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        console.log(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
};

const styles = StyleSheet.create({
  map: {
    height: 660,
  },
  logout: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 15,
    margin: 10,
    backgroundColor: colors.secondary,
    borderRadius: 24,
    width: 62,
  },
});

export default Map;
