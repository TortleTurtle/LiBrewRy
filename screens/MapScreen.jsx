import {Dimensions, Text, View, StyleSheet} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useEffect, useState} from "react";


export default function MapScreen(){
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

    const loadMarkers = () => {
        const markers = [];
        //loop through all hotspots
        hotspots.forEach((hotspot) => {
        //then loop through all venues
            hotspot.venues.forEach((venue, i) => {
                 markers.push(<Marker key={venue.venue} title={venue.venue} coordinate={venue.latLong}/>);
            });
        });
        return markers
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
                     customMapStyle={[
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
             ]}
            >
                {/*TODO: On marker click go to a detail screen*/}
                {loadMarkers().map((marker) => { return marker})}
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