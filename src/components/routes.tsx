import { useRoutes } from "react-router-dom";
import Demo from "../views/product-table"
import FormPage from "./form-page";
// ...

export default function RouterRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Demo />
    },
    {
      path: "/add-product",
      element: <FormPage open={false} close={function (): void {
          throw new Error("Function not implemented.");
      } } formTitle={""} />
    }
  ]);
  return routes;
}