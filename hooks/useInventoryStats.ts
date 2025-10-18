import { useMemo } from 'react';
import { InventoryEntry } from '../types/inventory.types';
import { filterEntriesByWeek } from '../services/inventoryService';

export function useInventoryStats(entries: InventoryEntry[]) {
  const weekEntries = useMemo(() => {
    return filterEntriesByWeek(entries);
  }, [entries]);

  const stats = useMemo(() => {
    return {
      totalEntries: entries.length,
      weekEntries: weekEntries.length,
      // Placeholder for streak calculation - implement later
      currentStreak: 5,
    };
  }, [entries, weekEntries]);

  return stats;
}