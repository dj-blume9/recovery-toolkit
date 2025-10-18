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

    async function getDailyInventoryId(date_iso: string) {
        const entry = await db.getFirstAsync<{ id: string }>('SELECT id FROM daily_inventories WHERE date_iso=?', [date_iso]);

        return entry?.id;
    }

    async function getAllInventories() {
        return db.getAllAsync<{ id: string, date_iso: string }>(
            `SELECT id, date_iso FROM daily_inventories`
        );
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

    // Answers
    async function saveAnswerByCode(inventoryId: string, code: string, value: string | null) {
        const prompt = await db.getFirstAsync<{ id: string }>(`SELECT id FROM daily_inventory_prompts WHERE code=?`, [code]);
        if (!prompt) throw new Error(`Unknown prompt code: ${code}`);

        const answerId = uuid();
        const textVal = value ?? null;

        await db.runAsync(`INSERT INTO daily_inventory_answers (id, daily_inventories_id, daily_inventory_prompts_id, value_text)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(daily_inventories_id, daily_inventory_prompts_id) DO UPDATE
            SET value_text =excluded.value_text, updated_at=datetime('now')`,
            [answerId, inventoryId, prompt.id, textVal])
    }

    async function getEntryByDate(date_iso: string) {
        return db.getAllAsync<{
            code: string; label: string; value_text: string | null;
        }>(`
            SELECT p.code, p.label, a.value_text
            FROM daily_inventory_prompts p
            LEFT JOIN daily_inventory_answers a ON a.daily_inventory_prompts_id = p.id
            LEFT JOIN daily_inventories i ON a.daily_inventories_id = i.id
            WHERE i.date_iso = ?
            ORDER BY p.code
            `, [date_iso]
        );
    }

    async function getAllEntries() {
        return db.getAllAsync<{
            date_iso: string, code: string; label: string; value_text: string | null;
        }>(`
            SELECT a.id, i.date_iso, p.code, p.label, a.value_text
            FROM daily_inventory_prompts p
            LEFT JOIN daily_inventory_answers a ON a.daily_inventory_prompts_id = p.id
            LEFT JOIN daily_inventories i ON a.daily_inventories_id = i.id
            ORDER BY p.code
            `
        );
    }

    async function getEntryById(inventoryId: string) {
        return db.getAllAsync<{
            id: string; date_iso: string; code: string; label: string; value_text: string | null;
        }>(`
            SELECT i.id, i.date_iso, p.code, p.label, a.value_text
            FROM daily_inventory_prompts p
            LEFT JOIN daily_inventory_answers a ON a.daily_inventory_prompts_id = p.id
            LEFT JOIN daily_inventories i ON a.daily_inventories_id = i.id
            WHERE i.id = ?
            ORDER BY p.code
            `, [inventoryId]
        );
    }

    return {
        getAllInventories,
        ensureDefaultPrompts,
        getAllPrompts,
        upsertDailyInventory,
        getDailyInventoryId,
        saveAnswerByCode,
        getEntryByDate,
        getEntryById,
        getAllEntries
    };
}