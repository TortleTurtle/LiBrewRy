import React, {useContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text} from "react-native";

export const ContentContext = React.createContext();

export function ContentProvider({children}) {
    const [content, setContent] = useState({});
    useEffect(() => {fetchContent(); testStorage();}, []);

    const fetchContent = async () => {
        try {
            const res = await fetch("https://stud.hosted.hr.nl/0965152/websites/LiBrewRy/hotspots.json");
            const data = await res.json();
            setContent(data);
        } catch (e) {
            console.error(e);
        }
    }

    const storeHotspot = async (key, hotspot) => {
        try {
            const json = JSON.stringify(hotspot);
            await AsyncStorage.setItem(key, json);
        } catch (e) {
            console.error(e);
        }
    }

    return(
        <ContentContext.Provider value={content}>
            {/*Check if content has been fetched before mounting child components*/}
            { Object.keys(content).length > 0 ? children : <Text>Loading</Text>}
        </ContentContext.Provider>
    )
}