import {
  Button,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import productManagementService from "../../services/product-management-service";
import { useLocation } from "react-router-dom";
import "../../components/styles.css";
import { IFormProps, Product } from "../../components/interfaces";

const FormPage = (props: IFormProps) => {
  const { control, handleSubmit } = useForm();

  const location = useLocation();

  const [productName, setProductName] = React.useState(
    location.state !== null && location.state.name !== undefined
      ? location.state.name
      : ""
  );
  const [productPrice, setProductPrice] = React.useState(
    location.state !== null && location.state.price !== undefined
      ? location.state.price
      : undefined
  );
  const [productType, setProductType] = React.useState(
    location.state !== null && location.state.type !== undefined
      ? location.state.type
      : ""
  );

  const typesArray = ["Books", "Electronics", "Food", "Furniture", "Toys"];

  const [productActive, setProductActive] = React.useState(
    location.state !== null && location.state.active !== undefined
      ? location.state.active
      : false
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductActive(event.target.checked);
    props.onActiveChange(event.target.checked);
  };

  const handleNameChange = (name: string) => {
    setProductName(name);
    props.onNameChange(name);
  };

  const handlePriceChange = (num: number) => {
    setProductPrice(num === 0 ? undefined : num);
    props.onPriceChange(num);
  };

  const handleTypeChange = (selectedValue: string) => {
    setProductType(selectedValue);
    props.onTypeChange(selectedValue);
  };

  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  const onSubmit = () => {


    const ProductObject: Product = {
      id: uuid(),
      name: productName,
      price: productPrice,
      type: productType,
      active: productActive,
    };

    if (location.state !== null) {
      const EditedProductObject: Product = {
        id: location.state.id,
        name: productName,
        price: productPrice,
        type: productType,
        active: productActive,
      };

      productManagementService.updateProduct(
        location.state.id,
        EditedProductObject
      );
      
    } else {
      productManagementService
        .createProduct(ProductObject)
        .then(() => window.location.reload());
      
        
    }
    
    navigate("/");
  };
  
  return (
    <>
      <h2>{location.state !== null ? "Edit Product" : "Add Product"}</h2>
      <form data-testid="add-or-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          name="name"
          data-testid = {"name"}
          onChange={(e) => handleNameChange(e.target.value)}
          value={productName}
        />

        <label>Price</label>
        <input
          name="price"
          data-testid="price"
          type="number"
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          value={productPrice}
        />

        <div>
          <label>
            Type &nbsp; <br></br>
            <select
              name="type"
              value={productType ?? "Select something"}
              data-testid="type"
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="">None</option>
              {typesArray.map((type) => (
                <option key={uuid()} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Controller
          name="active"
          control={control}
          render={() => (
            <FormControlLabel
              control={
                <Switch
                  data-testid="active"
                  checked={productActive}
                  onChange={handleChange}
                />
              }
              label="Active"
              labelPlacement="start"
            />
          )}
        />
        <Stack spacing={2} direction="row" justifyContent={"flex-end"}>
          <Button
            style={{ float: "right" }}
            variant="contained"
            onClick={handleHomePage}
          >
            Cancel
          </Button>
          <button data-testid = "submit"
            type="submit" onClick={handleSubmit(onSubmit)}>Save</button>
          {/* <Button
            style={{ float: "right" }}
            variant="contained"
            color="success"
            data-testid = "submit"
            type="submit"
          >
            Save
          </Button> */}
        </Stack>
      </form>
    </>
  );
};
export default FormPage;
