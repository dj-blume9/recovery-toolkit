import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, typography } from '../styles/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary.teal,
          },
          headerTintColor: colors.neutral.white,
          headerTitleStyle: {
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize.xl,
          },
          headerShadowVisible: true,
        }}>
        <Stack.Screen 
          name="index"
          options={{
            headerTitle: 'Recovery Toolkit',
          }}
        />
        <Stack.Screen 
          name="inventory"
          options={{
            headerTitle: 'Daily Inventory',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
