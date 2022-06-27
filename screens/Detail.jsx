import {SectionList, Text, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useStyle} from "../providers/StyleProvider.jsx";

export default function Detail({route, navigation}) {
    const [starRating, setStarRating] = useState(null);
    const ratingOptions = [1, 2, 3, 4, 5];
    const venue = route.params;
    const {styleSheet} = useStyle();

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

    return (
        <View style={styleSheet.container}>
            <View style={styleSheet.bigStarContainer}>
                {ratingOptions.map((option) => (
                    <Ionicons name={option <= starRating ? "ios-star" : "star-outline"}
                              onPress={() => setRating(option)}
                              style={option <= starRating ? styleSheet.starSelected : styleSheet.starUnselected}
                              key={option}
                              size={32}
                    />
                ))}
            </View>
            <SectionList
                sections={getList()}
                renderItem={({item}) => <Text style={styleSheet.item}>{item}</Text>}
                renderSectionHeader={({section}) => <Text style={styleSheet.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}