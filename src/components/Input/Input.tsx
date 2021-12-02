import React, { useState } from "react";
import { ICountry as Props } from "../CountriesList/CountriesList";

interface IProps {
  country: Props["name"];
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}

const Input: React.FC<IProps> = ({ country, handleSubmit, handleChange }) => {
  return (
    <form data-testid="search" onSubmit={handleSubmit}>
      <input
        data-testid="input"
        name="country"
        type="text"
        value={country}
        onChange={handleChange}
        placeholder="Search for a country..."
      />
    </form>
  );
};

export default Input;
