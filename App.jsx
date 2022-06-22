import { NavigationContainer} from "@react-navigation/native";
import Map from "./screens/MapScreen.jsx"
import List from "./screens/List.jsx"
import Settings from "./screens/Settings.jsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export default function App() {

  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map">
        <Tab.Screen name="Map" component={Map} options={{headerShown: false}}/>
        <Tab.Screen name="List" component={List} options={{headerShown: false}}/>
        <Tab.Screen name="Settings" component={Settings}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
