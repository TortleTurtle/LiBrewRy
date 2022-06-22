import {Dimensions, View, StyleSheet} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Detail from "./Detail.jsx";


export default function Map(){
    const MapStack = createNativeStackNavigator();

    return(
        <MapStack.Navigator initialRouteName="MapScreen">
            <MapStack.Screen name="MapScreen" component={MapScreen} options={{title: "Map"}}/>
            <MapStack.Screen name="Detail" component={Detail}/>
        </MapStack.Navigator>
    )
}

function MapScreen({navigation}){
    const [hotspots, setHotspots] = useState([]);

    useEffect(() => {   fetchHotspots() }, []);

    const fetchHotspots = async () => {
        try {
            const res = await fetch("https://stud.hosted.hr.nl/0965152/websites/LiBrewRy/hotspots.json");
            const data = await res.json();
            setHotspots(data);
        } catch (e) {
            console.error(e);
        }
    }

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

    return(
        <View style={styles.container}>
            <MapView style={styles.map}
                     initialRegion={{
                latitude: 51.915925469994704,
                longitude: 4.477762127342756,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
                     showsPointsOfInterest={false}
                     //Hide POI for Android.
                     customMapStyle={hideAndroidPOI}
            >
                {getVenues().map((venue, index) => { return <Marker onCalloutPress={() => {navigation.navigate("Detail", venue)}} key={index} title={venue.venue} coordinate={venue.latLong}/>})}
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
