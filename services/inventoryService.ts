import { formatDateDisplay } from '../utils/helpers';
import { InventoryEntry, InventoryResponse } from '../types/inventory.types';

type RawInventoryData = {
  date_iso: string;
  code: string;
  label: string;
  value_text: string | null;
};

type RawInventory = {
  id: string;
  date_iso: string;
};

type RawPrompt = {
  id: string;
  code: string;
  label: string;
};

/**
 * Transforms raw database responses into structured inventory entries
 */
export function transformInventoryData(
  allResponses: RawInventoryData[],
  allInventories: RawInventory[],
  allPrompts: RawPrompt[]
): InventoryEntry[] {
  // Group responses by date
  const responsesByDate = new Map<string, InventoryResponse[]>();

  allResponses.forEach((data) => {
    if (!data.date_iso) return;

    const response: InventoryResponse = {
      promptCode: data.code,
      promptLabel: data.label,
      response: data.value_text ?? ''
    };

    if (!responsesByDate.has(data.date_iso)) {
      responsesByDate.set(data.date_iso, []);
    }
    responsesByDate.get(data.date_iso)!.push(response);
  });

  // Build InventoryEntry objects
  const inventoryEntries: InventoryEntry[] = allInventories.map((inventory) => {
    const responses = responsesByDate.get(inventory.date_iso) || [];
    const completedPrompts = responses.filter(r => r.response.trim() !== '').length;

    return {
      id: inventory.id,
      date: inventory.date_iso,
      dateDisplay: formatDateDisplay(inventory.date_iso),
      responses: responses,
      completedPrompts: completedPrompts,
      totalPrompts: allPrompts.length,
    };
  });

  // Sort by date descending (newest first)
  inventoryEntries.sort((a, b) => b.date.localeCompare(a.date));

  return inventoryEntries;
}

/**
 * Filters entries to those within the last week
 */
export function filterEntriesByWeek(entries: InventoryEntry[]): InventoryEntry[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= oneWeekAgo && entryDate <= today;
  });
}

/**
 * Filters entries to those in the current month
 */
export function filterEntriesByMonth(entries: InventoryEntry[]): InventoryEntry[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  return entries.filter(entry => {
    const [yearStr, monthStr] = entry.date.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);
    return year === currentYear && month === currentMonth;
  });
}

/**
 * Applies the specified filter to entries
 */
export function applyFilter(
  entries: InventoryEntry[],
  filter: 'all' | 'week' | 'month'
): InventoryEntry[] {
  switch (filter) {
    case 'week':
      return filterEntriesByWeek(entries);
    case 'month':
      return filterEntriesByMonth(entries);
    case 'all':
    default:
      return entries;
  }
}