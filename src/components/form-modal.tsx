import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, FormControlLabel,  InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Stack } from "@mui/system";
import productManagementService from "../services/product-management-service";
import { Product } from "../views/product-table";
import uuid from 'react-uuid';


interface FormProps {
    open : boolean;
    close : () => void;
    formTitle : string;
    product? : Product;
    name?: string;
    price?: number;
    type?: string;
    active?: string;
    edit? : boolean;
}


const FormDialog = (props: FormProps) => {

    const { control, handleSubmit } = useForm<FormProps>();

    // const [exampleStateName, setExampleStateName]  = React.useState("");

    const [productName, setProductName] = React.useState(props.product !== undefined ? props.product.name : "" );
    const [productPrice, setProductPrice] = React.useState(props.product !== undefined ? props.product.price : 0.00 );
    const [productType, setProductType] = React.useState(props.product !== undefined ? props.product.type : "" );

    const typesArray = ["Books","Electronics","Food","Furniture","Toys"]

    const [productActive, setProductActive] = React.useState(props.product !== undefined ? props.product.active : false );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductActive(event.target.checked);
      };

      const handleTypeChange = (event: SelectChangeEvent) => {
        setProductType(event.target.value);
      };

    React.useEffect(() => {
        if(props.product !== undefined)
        setProductName(props.product?.name)
        
}, [props.product]);
    

  const onSubmit: SubmitHandler<FormProps> = data => {

    const ProductObject: Product = {
        id: uuid(),
        name: productName,
        price: productPrice,
        type: productType,
        active: productActive
    }

    if(props.edit && props.product !== undefined)
    {
        
        const EditedProductObject: Product = {
            id: props.product.id,
            name: productName,
            price: productPrice,
            type: productType,
            active: productActive
        }

            productManagementService
            .updateProduct(props.product.id,EditedProductObject)
            .then(() => window.location.reload())
        
    }
    else 
    {
        productManagementService
        .createProduct(ProductObject)
        .then(() => window.location.reload())
    }


    
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>{props.formTitle}</DialogTitle>
        <DialogContent>

        <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={() => <TextField
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        value = {productName}
        onChange={(e) => setProductName(e.target.value)}
      />}
      />
       <Controller
        name="price"
        control={control}
        render={({ field }) => <TextField
        margin="dense"
        id="name"
        label="Price"
        type="text"
        fullWidth
        variant="standard"
        value = {productPrice}
        onChange={(e) => setProductPrice(Number(e.target.value))}
      />}
      />
       
       <Controller
        name="type"
        control={control}
        
        render={() =>
            <>
         <FormControl sx={{ marginTop: 2 , marginBottom : 2, minWidth: 300 }} >
        <InputLabel id="simple-select-standard-label">Type</InputLabel>    
        <Select
        labelId="simple-select-standard-label"
        id="simple-select-standard"
        value={productType ?? "Select something"}
        onChange={handleTypeChange}
        label="Type"
        style={{marginRight : "100px"}}
      >
       <MenuItem value="">
            <em>None</em>
          </MenuItem>
       {typesArray.map((type) =>
       (<MenuItem key = {uuid()} value={type}>{type}</MenuItem>)
       )}
      </Select>
      </FormControl>
      </>}
      
      />
      
      <div></div>

<Controller
        name="name"
        control={control}
        render={() =>  <FormControlLabel
        control={<Switch checked={productActive} onChange = {handleChange} />}
        label="Active"
      /> }

      />
   <div></div>
   <div></div>
   <div></div>
      
      <Stack  spacing={2} direction="row" justifyContent={"flex-end"}>
        <Button style={{float: "right"}} variant="contained"  onClick={props.close}>Cancel</Button>
         <Button style={{float: "right"}} variant="contained" color="success" type="submit" onClick={props.close}>Save</Button>
         </Stack>
    </form>
        </DialogContent>
   
      </Dialog>
    </>
  );
}

export default FormDialog;
