export interface IColumn {
  key: string;
  title?: string;
  columnSlotName?: string;
  contentSlotName?: `${string}Content`;
  sortable?: boolean;
}

export interface IDataSource {
  key: string;
}
