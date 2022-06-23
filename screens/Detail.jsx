import {Text, View, StyleSheet, SectionList} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Detail({route, navigation}){
    const [starRating, setStarRating] = useState(null);
    const ratingOptions = [1, 2, 3, 4, 5];
    const venue = route.params;

    useEffect(() => {
        navigation.setOptions({title: venue.venue});
        getRating();
    }, []);

    /*Create an array holding title and data for a Section list.*/
    const getList = () => {
        const beerList = [];
        //Get the keys to all categories in venue.beerList.
        const categories = Object.keys(venue.beerList);

        categories.forEach((key) => {
            //use key as section title.
            beerList.push({title: key, data: venue.beerList[key]});
        });

        return beerList;
    }

    const setRating = async (newRating) => {
        const json = JSON.stringify(newRating);
        try {
            await AsyncStorage.setItem(venue.venue, json);
            setStarRating(newRating);
        } catch (e) {
            console.error(e);
        }
    }
    const getRating = async () => {
        try {
            const json = await AsyncStorage.getItem(venue.venue);
            setStarRating(json != null ? JSON.parse(json) : 0);
        } catch (e) {
            console.error(e);
        }
    }

    return(
        <View>
            <View style={styles.stars}>
                {ratingOptions.map((option) => (
                    <Ionicons name={ option <= starRating ? "ios-star" : "star-outline"}
                              onPress={() => setRating(option)}
                              style={option <= starRating ? styles.starSelected : styles.starUnselected}
                              key={option}
                              size={32}
                    />
                ))}
            </View>
            <SectionList
                sections={getList()}
                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 20
    },
    starUnselected:{
        color: '#aaa'
    },
    starSelected:{
        color: `#ffb300`
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})