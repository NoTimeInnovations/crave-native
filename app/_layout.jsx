import { Stack } from "expo-router";
import 'react-native-get-random-values';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      
    </Stack>
  );
};

export default RootLayout;
