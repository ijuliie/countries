import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "../Filter";

test("input is rendered", () => {
  render(<Filter handleSelectChange={() => {}} />);

  const selectElement = screen.getByText(/Filter by Region/i);

  expect(selectElement).toBeInTheDocument();
});

test("the length of all values should be 6", () => {
  render(<Filter handleSelectChange={() => {}} />);

  const options = screen.getAllByRole("option");

  expect(options).toHaveLength(6);
});

test("first value of dropdown has a class name of hidden", () => {
  render(<Filter handleSelectChange={() => {}} />);

  const hiddenValue = screen.getByText(/Filter by Region/i);

  expect(hiddenValue).toHaveClass("hidden");
});

test("onchange handler to be called", () => {
  const mockOnChange = jest.fn();
  render(<Filter handleSelectChange={mockOnChange} />);

  const selectElement = screen.getByTestId("select");

  fireEvent.change(selectElement, { target: { value: "Americas" } });
  expect(mockOnChange).toHaveBeenCalled();
});

test("selected value is true", () => {
  render(<Filter handleSelectChange={() => {}} />);

  const selectElement = screen.getByTestId("select");
  const selectedElement = screen.getByTestId("africa") as HTMLOptionElement;
  const notSelectedElement = screen.getByTestId("asia") as HTMLOptionElement;
  userEvent.selectOptions(selectElement, selectedElement);
  expect(selectedElement.selected).toBe(true);
  expect(notSelectedElement.selected).toBe(false);
});
