import { AddShoppingCart } from "@mui/icons-material";
import { Toolbar, Typography, Tooltip, IconButton, Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./dialog";
import { EnhancedTableToolbarProps, Product } from "./interfaces";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const [deleteOpen, setDeleteOpen] = useState(false);
  
  
    const handleDeleteClick = () => {
      setDeleteOpen(true);
    };
  
    const handleDeleteClose = () => {
      setDeleteOpen(false);
    };
  
   
    const navigate = useNavigate();
  
    const handleFormPage = () => {
        navigate('/addProduct')
    }
  
    const handleFormPageEdit = (product? : Product) => {
      navigate('/editProduct', {
        state: {...product}
      });
  }
  
    return (
      <>
      <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
         <strong> {numSelected} selected  </strong>
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
          textAlign={"center"}
        >
          Product Management System
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteClick} >
            <DeleteIcon fontSize='large'  color='error'/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
        <IconButton onClick={() => handleFormPageEdit(props.selectedProduct)}>
          <EditIcon fontSize='large' color='primary'/>
        </IconButton>
      </Tooltip>
      <DeleteDialog open={deleteOpen} close={handleDeleteClose} id={props.selectedProduct !== undefined ? props.selectedProduct.id : ""} message={"Are you sure that you want to delete this product ?"} /> 
      </>
      ) : (
        <>
  
        <Tooltip title="Add Product">
          <IconButton aria-label='Add' onClick={handleFormPage }>
            < AddShoppingCart fontSize='large' color='success' />
          </IconButton>
        </Tooltip>
        </>
      )}
    </Toolbar>
    <Divider sx={{ borderBottomWidth: 1, bgcolor: "black" }}></Divider>
      </>
    );
  }
  