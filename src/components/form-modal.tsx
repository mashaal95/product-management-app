import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControlLabel, Input, Select, Switch } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Stack } from "@mui/system";
import productManagementService from "../services/product-management-service";
import { Product } from "../views/product-table";
import uuid from 'react-uuid';


interface FormProps {
    open : boolean;
    close : () => void;
    formTitle : string;
    name?: string;
    price?: number;
    type?: string;
    active?: string;
}


const FormDialog = (props: FormProps) => {

    const { control, handleSubmit } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = data => {
    const ProductObject: Product = {
        id: uuid(),
        name: data.name ?? "",
        price: data.price ?? 0.0,
        type: data.type ?? "",
        active: data.active ?? ""
    }
    productManagementService
        .createProduct(ProductObject)
        .then(response => window.location.reload())
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
        defaultValue= {props.name}
        render={({ field }) => <TextField
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        defaultValue= {props.name}

        {...field}
      />}
      />
       <Controller
        name="price"
        control={control}
        defaultValue= {props.price}
        render={({ field }) => <TextField
        margin="dense"
        id="name"
        label="Price"
        type="text"
        fullWidth
        variant="standard"
        defaultValue= {props.price}

        {...field}
      />}
      />
       <Controller
        name="type"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField
        margin="dense"
        id="name"
        label="Type"
        type="text"
        fullWidth
        variant="standard"
        defaultValue= {props.type}

        {...field}
      />}
      />

<Controller
        name="name"
        control={control}
        render={({ field }) =>  <FormControlLabel
        control={<Switch />}
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
