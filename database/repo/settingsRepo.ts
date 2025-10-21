import { useSQLiteContext } from 'expo-sqlite';

export function useSettingsRepo() {
    const db = useSQLiteContext();

    async function updateSetting(key: string, value: string) {
        await db.runAsync(`
        INSERT INTO app_settings(key, value)
        VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            updated_at = datetime('now');
        `, [key, value]);
    }

    async function getSetting(key: string) {
        return db.getFirstAsync<{value: string}>(`SELECT value FROM app_settings WHERE key=?`,
            [key]
        )
    }

    return {
        updateSetting,
        getSetting
    }
}