import { useMemo } from 'react';
import { InventoryEntry } from '../types/inventory.types';
import { filterEntriesByWeek } from '../services/inventoryService';

export function useInventoryStats(entries: InventoryEntry[]) {
    const weekEntries = useMemo(() => {
        return filterEntriesByWeek(entries);
    }, [entries]);

    function parseLocalDate(dateString: string): Date {
        const [y, m, d] = dateString.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    function toYMDLocal(d: Date): string {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function getCurrentStreak(items: InventoryEntry[], requireToday = false): number {
        if (!items.length) return 0;

        // 1) Build a Set of unique local YYYY-MM-DD strings (dedupe multiple items/day)
        const days = new Set(items.map(i => toYMDLocal(parseLocalDate(i.date))));

        // 2) Decide the starting point:
        const todayStr = toYMDLocal(new Date());
        let startStr: string;

        if (requireToday) {
            // Streak must include *today*
            if (!days.has(todayStr)) return 0;
            startStr = todayStr;
        } else {
            // Streak ends on the most recent active day (could be yesterday, etc.)
            // Find max date in the set
            let maxDate: Date | null = null;
            for (const s of days) {
                const d = parseLocalDate(s);
                if (!maxDate || d > maxDate) maxDate = d;
            }
            if (!maxDate) return 0;
            startStr = toYMDLocal(maxDate);
        }

        // 3) Walk backwards day-by-day
        let streak = 0;
        let cursor = parseLocalDate(startStr);

        while (true) {
            const cursorStr = toYMDLocal(cursor);
            if (!days.has(cursorStr)) break;
            streak += 1;
            // move back one local day
            cursor.setDate(cursor.getDate() - 1);
        }

        return streak;
    }

    const stats = useMemo(() => {
        return {
            totalEntries: entries.length,
            weekEntries: weekEntries.length,
            currentStreak: getCurrentStreak(entries),
        };
    }, [entries, weekEntries]);

    return stats;
}