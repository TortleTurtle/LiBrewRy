import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import MapScreen from "./screens/MapScreen.jsx"
import List from "./screens/List.jsx"
import Settings from "./screens/Settings.jsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export default function App() {

  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen}/>
        <Tab.Screen name="List" component={List}/>
        <Tab.Screen name="Settings" component={Settings}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
