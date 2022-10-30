import { act, fireEvent, render } from "@testing-library/react";
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

    onActiveChange() {
      return;
    },

    onSubmit() {
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
  state: { name: "", price: undefined, type: "", active: false },
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
    price: null,
    type: "",
  });
});

test("should allow entering a name", async () => {
  const onNameChange = jest.fn();
  const { findByTestId } = renderFormPage({ onNameChange });
  const name = await findByTestId("name");

  
  act(() => {
    fireEvent.change(name, { target: { value: "test" } });
});

  expect(onNameChange).toHaveBeenCalledWith("test");
});

test("should allow entering a price", async () => {
  const onPriceChange = jest.fn();
  const { findByTestId } = renderFormPage({ onPriceChange });
  const price = await findByTestId("price");



  act(() => {
    fireEvent.change(price, { target: { value: 34 } });
});

  expect(onPriceChange).toHaveBeenCalledWith(34);
});

test("should allow toggling the active switch to true", async () => {
  const onActiveChange = jest.fn();
  const { getByRole } = renderFormPage({ onActiveChange });

  // Checking for when the toggle switch is checked
  (await getByRole("checkbox")).click();

  await act(async () => {
    fireEvent.change(await getByRole("checkbox"), {
        target: { checked: "true" },
      });
});

  expect(getByRole("checkbox")).toHaveProperty("checked", true);

  // Checking for unchecking the toggle switch
  (await getByRole("checkbox")).click();
 await act(async () => {
    fireEvent.change(await getByRole("checkbox"), {
        target: { checked: "" },
      });
});
  expect(getByRole("checkbox")).toHaveProperty("checked", false);
});

test("should allow changing a value in the type dropdown list", async () => {
  const onTypeChange = jest.fn();
  const { findByTestId } = renderFormPage({ onTypeChange });
  const name = await findByTestId("type");



  act(() => {
    fireEvent.change(name, { target: { value: "Books" } });
});


  expect(onTypeChange).toHaveBeenCalledWith("Books");
});

