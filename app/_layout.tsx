import { Link, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, typography } from '../styles/theme';
import { SQLiteProvider } from 'expo-sqlite';
import { migrate } from '../database/migrate';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
              headerRight: () => {
                return <Link style={{ marginRight: 12 }} href={'/settings'}>
                  <FontAwesome6 name="gear" size={24} color="white" />
                </Link>;
              },
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
          <Stack.Screen
            name="settings"
            options={{
              headerTitle: 'Settings',
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}