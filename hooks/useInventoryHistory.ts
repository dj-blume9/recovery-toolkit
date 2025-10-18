import { useState, useEffect } from 'react';
import { useDailyInventoriesRepo } from '../database/repo/dailyInventoriesRepo';
import { InventoryEntry } from '../types/inventory.types';
import { transformInventoryData } from '../services/inventoryService';

export function useInventoryHistory() {
  const repo = useDailyInventoriesRepo();
  const [entries, setEntries] = useState<InventoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadEntries() {
      try {
        setLoading(true);
        setError(null);

        const allResponses = await repo.getAllEntries();
        const allInventories = await repo.getAllInventories();
        const allPrompts = await repo.getAllPrompts();

        const inventoryEntries = transformInventoryData(
          allResponses,
          allInventories,
          allPrompts
        );

        setEntries(inventoryEntries);
      } catch (err) {
        console.error('Error loading inventory entries:', err);
        setError(err instanceof Error ? err : new Error('Failed to load entries'));
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  return { entries, loading, error };
}