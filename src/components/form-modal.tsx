import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControlLabel, Switch } from "@mui/material";


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

  return (
    <>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>{props.formTitle}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue= {props.name}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            defaultValue= {props.price}
          />
          <TextField
            margin="dense"
            id="type"
            label="Type"
            type="text"
            fullWidth
            variant="standard"
            defaultValue= {props.type}
          />
          <FormControlLabel
            control={<Switch />}
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={props.close}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialog;
