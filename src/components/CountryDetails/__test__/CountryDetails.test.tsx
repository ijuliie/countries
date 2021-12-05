import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryDetails from "../CountryDetails";
import axios from "axios";
jest.mock("axios");

const MockCountryDetails = () => {
  return (
    <BrowserRouter>
      <CountryDetails />
    </BrowserRouter>
  );
};

test("calls API without error and renders country's details", async () => {
  render(<MockCountryDetails />);
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  const divElement = await screen.queryByTestId("details");

  expect(divElement).toBeInTheDocument();
});
