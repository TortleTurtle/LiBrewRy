import {Text, View, StyleSheet, SectionList} from "react-native";
import {useEffect} from "react";

export default function Detail({route, navigation}){
    const venue = route.params;
    useEffect(() => {navigation.setOptions({title: venue.venue})})
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

    //TODO: Rate the venue and store it.

    return(
        <View>
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