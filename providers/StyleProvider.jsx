import React, {createContext, useContext, useState} from "react";
import {StyleSheet} from "react-native";

const StyleContext = createContext();
const StyleToggleContext = createContext();

export function useStyle() {
    return useContext(StyleContext);
}

export function useToggleStyle() {
    return useContext(StyleToggleContext);
}

export function StyleProvider({children}) {
    const [theme, setTheme] = useState(true);

    function toggleStyle() {
        setTheme(!theme);
    }

    return (
        <StyleContext.Provider value={theme ? lightTheme : darkTheme}>
            <StyleToggleContext.Provider value={toggleStyle}>
                {children}
            </StyleToggleContext.Provider>
        </StyleContext.Provider>
    )
}

const lightTheme = {
    styleSheet: StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#E6D5B8',
        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: '#E45826',
        },
        item: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            backgroundColor: 'rgb(255,236,175)',
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.5)'
        },
        itemText: {
            fontSize: 18,
        },
        bigStarContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
            backgroundColor: 'rgb(255,236,175)'
        },
        smallStarContainer: {
            display: "flex",
            flexDirection: "row"
        },
        starUnselected: {
            color: '#E45826'
        },
        starSelected: {
            color: `#ffb300`
        },
        navHeader: {
            backgroundColor: `#ffb300`,
        },
    }),
    navStyle: {
        headerStyle: {backgroundColor: '#F0A500'},
        headerTintColor: '#1B1A17',
        barStyle: {backgroundColor: '#F0A500'},
        activeColor: '#1B1A17',
        inactiveColor: '#E45826'
    }
};
const darkTheme = {
    styleSheet: StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#1B1A17',
        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: '#1B1A17',
            color: '#F0A500'
        },
        item: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            backgroundColor: '#E45826',
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.5)'
        },
        itemText: {
            fontSize: 18,
        },
        bigStarContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
            backgroundColor: '#E45826'
        },
        smallStarContainer: {
            display: "flex",
            flexDirection: "row"
        },
        starUnselected: {
            color: '#1B1A17'
        },
        starSelected: {
            color: `#ffb300`
        },
        navHeader: {
            backgroundColor: `#ffb300`,
        },
    }),
    navStyle: {
        headerStyle: {backgroundColor: '#1B1A17'},
        headerTintColor: '#F0A500',
        barStyle: {backgroundColor: '#1B1A17'},
        activeColor: '#F0A500',
        inactiveColor: '#E45826'
    }
};