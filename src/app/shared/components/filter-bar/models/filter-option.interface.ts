export interface FilterOption {
  name: string;
  text: string;
  placeholder?: string;
  values: {
    text: string;
    value: any;
  }[];
}
