import { useSQLiteContext } from 'expo-sqlite';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export type DailyInventoryPrompt = {
    id: string;
    code: string;
    label: string;
    meta_json?: string | null;
}

export function useDailyInventoriesRepo() {
    const db = useSQLiteContext();

    // Daily Inventories
    async function upsertDailyInventory(date_iso: string) {
        const entry = await db.getFirstAsync<{ id: string }>('SELECT id FROM daily_inventories WHERE date_iso=?', [date_iso]);

        const id = uuid();
        await db.runAsync('INSERT INTO daily_inventories (id, date_iso) VALUES (?, ?)', [id, date_iso]);
        return id;
    }

    // Prompts
    async function ensureDefaultPrompts() {
        const defaults: Omit<DailyInventoryPrompt, 'id'>[] = [
            {
                code: '1_feeling',
                label: 'How Am I Feeling Today?',
            },
            {
                code: '2_right',
                label: 'What Did I Do Right Today?',
            },
            {
                code: '3_wrong',
                label: 'What Did I Do Wrong Today?'
            },
            {
                code: '4_amends',
                label: 'Do I Owe Anyone An Amends? Do I Need To Offer Forgiveness To Anyone?'
            },
            {
                code: '5_amends_plan',
                label: 'If So, How Will I Do It?'
            },
            {
                code: '6_prayer_requests',
                label: 'What Are My Prayer Requests?'
            },
            {
                code: '7_recovery_action',
                label: 'What Is The Next Action I Need To Take For My Recovery?'
            }
        ];

        await db.withTransactionAsync(async () => {
            for (const p of defaults) {
                await db.runAsync(
                    `INSERT INTO daily_inventory_prompts (id, code, label)
                    VALUES (?, ?, ?)
                    ON CONFLICT(code) DO UPDATE SET label=excluded.label`,
                    [uuid(), p.code, p.label]
                );
            }
        });

    }

    async function getAllPrompts() {
        return db.getAllAsync<DailyInventoryPrompt>(`SELECT * FROM daily_inventory_prompts ORDER BY code`)
    }

    return {
        ensureDefaultPrompts,
        getAllPrompts,
        upsertDailyInventory
    };
}