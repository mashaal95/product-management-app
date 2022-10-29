import { Route, Routes } from "react-router-dom";
import FormPage from "./views/form-page";
import Demo from "./views/product-table";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/addProduct" element={<FormPage />} />
      <Route path="/editProduct" element={<FormPage />} />
    </Routes>
  );
}
