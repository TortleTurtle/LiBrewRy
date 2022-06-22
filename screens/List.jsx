import {useEffect, useState, useContext} from "react";
import {SectionList, Text, View, StyleSheet} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Detail from "./Detail.jsx";
import {ContentContext} from "../providers/ContentProvider.jsx";

export default function List(){
    const ListStack = createNativeStackNavigator();

    return(
        <ListStack.Navigator initialRouteName="ListScreen">
            <ListStack.Screen name="ListScreen" component={ListScreen} options={{title: "List"}}/>
            <ListStack.Screen name="Detail" component={Detail}/>
        </ListStack.Navigator>
    )
}

function ListScreen({navigation}){
    const hotspots = useContext(ContentContext);
    /*Returns an array holding objects that contain the title and data for a Section list.*/
    const getList = () => {
        const hotspotList = []
        //loop through all hotspots
        hotspots.map((hotspot) => {
            //push object holding title and date into hotspotList array.
            hotspotList.push({title: hotspot.label, data: hotspot.venues})
        });

        return hotspotList;
    }

    return(
        <View style={styles.container}>
            <SectionList
                sections={getList()}
                renderItem={
                ({item}) => <Text style={styles.item} onPress={() => {navigation.navigate("Detail", item)}} >{item.venue}</Text>}
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