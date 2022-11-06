import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { base, colors } from '../utils/base';
import auth from '@react-native-firebase/auth';
import { pairScooter } from '../api/Api';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from '../utils/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

interface IProps {}

const MapInfo = (props: IProps) => {
  const [isTurnOn, setIsTurnOn] = useState<boolean>(false);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          height: 200,
          backgroundColor: colors.tertiary,
          marginTop: -30,
          padding: 20,
          borderRadius: 24,
        },
      ]}
    >
      <View style={[base.flex, base.alignItemsCenter]}>
        <Text style={[base.h3, { color: colors.secondary }]}>Battery</Text>
        <Text style={[base.h3, { color: colors.white }]}>100%</Text>
      </View>
      <View style={[base.flex, base.mt2, base.alignItemsCenter]}>
        <Text
          onPress={() => setIsTurnOn(!isTurnOn)}
          style={[base.h1, { color: isTurnOn ? colors.secondary : colors.dangerLight }]}
        >
          {isTurnOn ? 'START' : 'STOP'}
        </Text>
      </View>
      <View style={[base.flex, base.alignItemsCenter]}>
        <Text style={[base.h3, { color: colors.secondary }]}>Odometer</Text>
        <Text style={[base.h3, { color: colors.white }]}>229.9km</Text>
      </View>
    </View>
  );
};

export default MapInfo;
