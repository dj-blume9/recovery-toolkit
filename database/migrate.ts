import type { SQLiteDatabase } from 'expo-sqlite';

export async function migrate(db: SQLiteDatabase) {
    await db.execAsync('PRAGMA journal_mode = WAL;');

    const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
    const version = row?.user_version ?? 0;

    await db.withTransactionAsync(async () => {
        if (version < 1) {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS daily_inventories (
                    id TEXT PRIMARY KEY,
                    date_iso TEXT NOT NULL,
                    created_at TEXT NOT NULL DEFAULT (datetime('now')),
                    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                );
                CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_inventory_date ON daily_inventories(date_iso);

                CREATE TABLE IF NOT EXISTS daily_inventory_prompts (
                    id TEXT PRIMARY KEY,
                    code TEXT UNIQUE,
                    label TEXT NOT NULL,
                    meta_json TEXT
                );

                CREATE TABLE IF NOT EXISTS daily_inventory_answers (
                    id TEXT PRIMARY KEY,
                    daily_inventories_id TEXT NOT NULL REFERENCES daily_inventories(id) ON DELETE CASCADE,
                    daily_inventory_prompts_id TEXT NOT NULL REFERENCES daily_inventory_prompts(id),
                    value_text TEXT,
                    value_num REAL,
                    created_at TEXT NOT NULL DEFAULT (datetime('now')),
                    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
                    UNIQUE(daily_inventories_id, daily_inventory_prompts_id)
                );

                CREATE INDEX IF NOT EXISTS idx_answers_inventory ON daily_inventory_answers(daily_inventories_id);
                CREATE INDEX IF NOT EXISTS idx_answers_prompt ON daily_inventory_answers(daily_inventory_prompts_id);

                PRAGMA user_version = 1;
            `)
        }
    })

}