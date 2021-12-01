import { render, screen, waitFor } from "@testing-library/react";
import Home from "../Home";
import axios from "axios";
jest.mock("axios");

test("calls API without error and renders list of countries", async () => {
  render(<Home />);
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  const divElement = await screen.getByTestId("country");
  expect(divElement).toBeInTheDocument();
});
