import { render, screen, fireEvent, } from "@testing-library/react";
import Input from "../Input";

describe("input element", () => {
  test("should render input element", async () => {
    render(
      <Input country={""} setCountries={() => {}} setCountry={() => {}} />
    );
    const inputElement = screen.getByPlaceholderText(
      /Search for a country.../i
    );
    expect(inputElement).toBeInTheDocument();
  });
});
