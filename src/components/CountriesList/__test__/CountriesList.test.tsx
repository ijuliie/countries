import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import CountriesList from "../CountriesList";
import axios from "axios";
jest.mock("axios");

const MockCountryList = () => {
  return (
    <BrowserRouter>
      <CountriesList />
    </BrowserRouter>
  )
}

test("calls API without error and renders list of countries", async () => {
  render(<MockCountryList />);
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  const divElement = await screen.getByTestId("country");
  expect(divElement).toBeInTheDocument();
});
