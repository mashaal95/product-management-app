

export interface IFormProps {
    name? : string;
}

export interface EnhancedTableToolbarProps {
    numSelected : number;
    selectedProduct? : Product;
}

type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Product) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface Product {
    id : string;
    type: string;
    active: boolean;
    price: number;
    name: string;
}
  


