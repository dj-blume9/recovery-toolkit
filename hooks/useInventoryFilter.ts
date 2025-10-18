import { useState, useMemo } from 'react';
import { InventoryEntry } from '../types/inventory.types';
import { applyFilter } from '../services/inventoryService';

type FilterType = 'all' | 'week' | 'month';

export function useInventoryFilter(entries: InventoryEntry[]) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const filteredEntries = useMemo(() => {
    return applyFilter(entries, selectedFilter);
  }, [entries, selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
    filteredEntries,
  };
}