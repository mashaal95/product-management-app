import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField } from "@mui/material";
import * as React from "react";
import {  Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import productManagementService from "../services/product-management-service";
import { useLocation } from "react-router-dom";
import "./styles.css";
import { IFormProps, Product } from "./interfaces";



const FormPage = ()  => {
    const { control, handleSubmit } = useForm();

    const location = useLocation();

    const [productName, setProductName] = React.useState(location.state !== null ? location.state.name : "" );
    const [productPrice, setProductPrice] = React.useState(location.state !== null ? location.state.price : 0.00 );
    const [productType, setProductType] = React.useState(location.state !== null ? location.state.type : "" );

    const typesArray = ["Books","Electronics","Food","Furniture","Toys"]

    const [productActive, setProductActive] = React.useState(location.state !== null ? location.state.active : false );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductActive(event.target.checked);
      };

      const handleTypeChange = (event: SelectChangeEvent) => {
        setProductType(event.target.value);
      };


    
const navigate = useNavigate();

const handleHomePage = () => {
    navigate('/')
}


  const onSubmit: SubmitHandler<IFormProps> = data => {

    const ProductObject: Product = {
        id: uuid(),
        name: productName,
        price: productPrice,
        type: productType,
        active: productActive
    }

    if(location.state !== null)
    {
        
        const EditedProductObject: Product = {
            id: location.state.id,
            name: productName,
            price: productPrice,
            type: productType,
            active: productActive
        }

            productManagementService
            .updateProduct(location.state.id,EditedProductObject)
        
    }
    else 
    {
        productManagementService
        .createProduct(ProductObject)
        .then(() => window.location.reload())
    }

    navigate('/')
    
  };

  return (
    <>
    <h1 >{location.state !== null ? "Edit Product" : "Add Product" }</h1>
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
      name="name"
      control={control}
      render={() => <TextField
      style={{marginTop: "20px"}}
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
      name="name"
      control={control}
      render={() =>
      <>
      <FormControl sx={{ marginTop: 3 , marginBottom : 2, minWidth: 300 }} >
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
      labelPlacement="start"
    /> }

    />
 <div></div>
 <div></div>
 <div></div>
    
    <Stack  spacing={2} direction="row" justifyContent={"flex-end"}>
      <Button style={{float: "right"}} variant="contained"  onClick={handleHomePage}>Cancel</Button>
       <Button style={{float: "right"}} variant="contained" color="success" type="submit">Save</Button>
       </Stack>
  </form>
  </>
  );
}
export default FormPage;
