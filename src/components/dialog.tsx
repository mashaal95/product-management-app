import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import productManagementService from "../services/product-management-service";
import { DialogProps } from "./interfaces";

const DeleteDialog = (props: DialogProps) => {
  const deleteProduct = (id: string) => {
    productManagementService
      .removeProduct(id)
      .then(() => window.location.reload());
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={props.close}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteProduct(props.id)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteDialog;
