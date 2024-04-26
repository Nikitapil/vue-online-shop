export interface IMultiSelectOption {
  name: string;
  value: string;
  disabled?: boolean;
}

export interface IMultiSelectInternalOption extends IMultiSelectOption {
  checked: boolean;
}
