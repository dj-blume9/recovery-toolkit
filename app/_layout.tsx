import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, typography } from '../styles/theme';
import { SQLiteProvider } from 'expo-sqlite';
import { migrate } from '../database/migrate';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="recovery.db" onInit={migrate}>
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
          <Stack.Screen
            name="history"
            options={{
              headerTitle: 'History',
            }}
          />
          <Stack.Screen
            name="entry-detail"
            options={{
              headerTitle: 'Entry Details',
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}