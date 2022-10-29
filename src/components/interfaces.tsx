export interface IFormProps {
  name?: string;
  onNameChange: (name: string) => void;
  onPriceChange: (price: number) => void;
  onTypeChange: (type: string) => void;

}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  selectedProduct?: Product;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

export interface Product {
  id: string;
  type: string;
  active: boolean;
  price: number;
  name: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Product;
  label: string;
  numeric: boolean;
}

export interface DialogProps {
  open: boolean;
  close: () => void;
  id: string;
  message: string;
}
