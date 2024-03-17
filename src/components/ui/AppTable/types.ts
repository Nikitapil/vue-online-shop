type TColumnRecord = Record<string, any>;

export interface IColumn extends TColumnRecord {
  key: string;
  title?: string;
  columnSlotName?: string;
  sortable?: boolean;
}
