import {Button, Dimensions, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useContext, useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Detail from "./Detail.jsx";
import {ContentContext} from "../providers/ContentProvider.jsx";
import {useStyle} from "../providers/StyleProvider.jsx";
import * as Location from "expo-location";


export default function Map({route}) {
    const MapStack = createNativeStackNavigator();
    const {navStyle} = useStyle();
    return (
        <MapStack.Navigator initialRouteName="MapScreen" screenOptions={{
            headerStyle: navStyle.headerStyle,
            headerTintColor: navStyle.headerTintColor
        }}>
            <MapStack.Screen name="MapScreen" component={MapScreen} options={{title: "Map"}}/>
            <MapStack.Screen name="Detail" component={Detail}/>
        </MapStack.Navigator>
    )
}

function MapScreen({route, navigation}) {
    const hotspots = useContext(ContentContext);

    //useEffect to get users permission to use location.
    useEffect(() => {
        requestPermission();
    }, []);

    //puts all venues in one array to create markers with them
    const getVenues = () => {
        const venues = [];

        //loop through all hotspots
        hotspots.forEach((hotspot) => {
            //then loop through all venues
            hotspot.venues.forEach((venue) => {
                //push the venue into the venues array
                venues.push(venue);
            });
        });
        return venues
    }

    const requestPermission = async () => {
        await Location.requestForegroundPermissionsAsync();
    };

    const getLocation = async () => {
        const location = await Location.getCurrentPositionAsync({});
        navigation.setParams({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     region={{
                         latitude: route.params ? route.params.latitude : 51.915925469994704,
                         longitude: route.params ? route.params.longitude : 4.477762127342756,
                         latitudeDelta: 0.005,
                         longitudeDelta: 0.005
                     }}
                     showsPointsOfInterest={false}
                //Hide POI for Android.
                     customMapStyle={hideAndroidPOI}
                     showsUserLocation={true}
            >
                {getVenues().map((venue, index) => {
                    return (
                        <Marker onCalloutPress={() => {
                            navigation.navigate("Detail", venue)
                        }}
                                key={index}
                                title={venue.venue}
                                coordinate={venue.latLong}
                        />
                    )
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 1
    },
});

const hideAndroidPOI = [
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
