import {useEffect, useState} from "react";
import {SectionList, Text, View, StyleSheet} from "react-native";

export default function List(){
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

    const getList = () => {
        /*Create an array holding title and data for a Section list.*/
        const hotspotList = []
        //loop through all hotspots
        hotspots.map((hotspot) => {
            hotspotList.push({title: hotspot.label, data: hotspot.venues})
        });
        return hotspotList;
    }

    return(
        <View style={styles.container}>
            <SectionList
                sections={getList()}
                renderItem={({item}) => <Text style={styles.item}>{item.venue}</Text>}
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