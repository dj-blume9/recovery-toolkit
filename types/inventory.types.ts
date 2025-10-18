export type InventoryResponse = {
  promptCode: string;
  promptLabel: string;
  response: string;
};

export type InventoryEntry = {
  id: string;
  date: string;
  dateDisplay: string;
  responses: InventoryResponse[];
  completedPrompts: number;
  totalPrompts: number;
};