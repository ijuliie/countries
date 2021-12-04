import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import Input from "../Input";

const handleChange = jest.fn();
const handleSubmit = jest.fn();

describe("input element", () => {
  test("should render input element", async () => {
    render(
      <Input
        country={{common: ""}}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(
      /Search for a country.../i
    );
    expect(inputElement).toBeInTheDocument();
  });

  test("onChange handler should be called", async () => {
    render(
      <Input
        country={{common: ""}}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    );

    const inputElement = screen.getByTestId("input") as HTMLInputElement;

    // invoking onChange event
    fireEvent.change(inputElement, { target: { value: "Brazil" } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("input is empty on submit", () => {
    render(
      <Input
        country={{common: ""}}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    );

    const formElement = screen.getByTestId("search");
    const inputElement = screen.getByTestId("input") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "Brazil" } });

    // invoking submit event
    fireEvent.submit(formElement);

    expect(handleSubmit).toHaveBeenCalled()

    // input should be empty after submitting
    expect(inputElement.value).toBe("")
  });
});
