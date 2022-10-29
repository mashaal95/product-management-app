import { Route, Routes } from "react-router-dom"
import FormPage  from "./components/form-page"
import Demo from "./views/product-table"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/addOrEdit" element={<FormPage />} />
    </Routes>
  )
}