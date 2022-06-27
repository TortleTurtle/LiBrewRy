import React from "react";
import {Button, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleContext, useStyle, useToggleStyle} from "../providers/StyleProvider.jsx";

export default function Settings() {
    const {styleSheet} = useStyle();
    const toggleStyle = useToggleStyle();

    const deleteStoredData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styleSheet.container}>
            <Button title={"Delete"} onPress={() => {
                deleteStoredData()
            }}/>
            <Button title={"Style"} onPress={toggleStyle}/>
        </View>
    )
}