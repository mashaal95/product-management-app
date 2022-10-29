import { fireEvent, render } from "@testing-library/react";
import FormPage from "./form-page";
import { IFormProps } from "../../components/interfaces";
import { useLocation } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

function renderFormPage(props: Partial<IFormProps> = {}) {
  const defaultProps: IFormProps = {
    onNameChange() {
      return;
    },
    onPriceChange() {
      return;
    },
    onTypeChange() {
      return;
    },

    name: "name",
  };
  return render(<FormPage {...defaultProps} {...props} />);
}

const mockUseLocationValue = {
  pathname: "/addProduct",
  search: "",
  hash: "",
  state: { name: "", price: 0.0, type: "", active: false },
};

jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as {}),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

test("should display a blank form", async () => {
  const { findByTestId } = renderFormPage();

  const form = await findByTestId("add-or-edit-form");
  expect(form).toHaveFormValues({
    name: "",
    price: 0.0,
    type: "",
  });
});

test("should allow entering a name", async () => {
    const onNameChange = jest.fn();
    const { findByTestId } = renderFormPage({ onNameChange });
    const username = await findByTestId("name");
  
    fireEvent.change(username, { target: { value: "test" } });
  
    expect(onNameChange).toHaveBeenCalledWith("test");
  });
  
  test("should allow entering a price", async () => {
    const onPriceChange = jest.fn();
    const { findByTestId } = renderFormPage({ onPriceChange });
    const username = await findByTestId("price");
  
    fireEvent.change(username, { target: { value: 34 } });
  
    expect(onPriceChange).toHaveBeenCalledWith(34);
  });
