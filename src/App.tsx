import { Route, Routes } from "react-router-dom";
import FormPage from "./views/form-page/form-page";
import Demo from "./views/product-table";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route
        path="/addProduct"
        element={
          <FormPage
            onNameChange={(name: string) => console.log(name)}
            onPriceChange={(num: number) => console.log(num)}
            onTypeChange={(type: string) => console.log(type)}
            onActiveChange = {(active: boolean) => console.log(active)}
            onSubmit= {(name: string, price: number, type: string, active: boolean) => console.log(name,price,type,active)}
          />
        }
      />
      <Route
        path="/editProduct"
        element={
          <FormPage
            onNameChange={(name: string) => console.log(name)}
            onPriceChange={(num: number) => console.log(num)}
            onTypeChange={(type: string) => console.log(type)}
            onActiveChange = {(active: boolean) => console.log(active)}
            onSubmit= {(name: string, price: number, type: string, active: boolean) => console.log(name,price,type,active)}
          />
        }
      />
    </Routes>
  );
}
