export interface IData {
  id: string;
  value: string;
}
export interface IOption {
  value: string;
}

export interface IDescr {
  id: string;
  type: string;
  placeholder: string;
  dataType: string;
  options?: IOption[];
  value: string;
}
