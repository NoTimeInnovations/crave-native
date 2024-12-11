import { Tabs, Redirect } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RootLayout = () => {
    return (
        <Tabs>

            {/* Index Screen with Bottom Tabs */}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home-outline" color={color} size={size} />
                    ), 
                    headerShown: false,
                }}
            />

            {/* Profile Tab */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-outline" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="admin"
                options={{
                    title: "admin",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-outline" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tabs>
    );
};

export default RootLayout;
