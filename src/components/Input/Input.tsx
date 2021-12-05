import React from "react";
import { ICountry as Props } from "../CountriesList/CountriesList";
import "./Input.css";

interface IProps {
  country: Props["name"];
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Input: React.FC<IProps> = ({ country, handleSubmit, handleChange }) => {
  return (
    <form data-testid="search"  onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          data-testid="input"
          className="input"
          name="country"
          type="text"
          value={country.common}
          onChange={handleChange}
          placeholder="Search for a country..."
        />
      </div>
    </form>
  );
};

export default Input;
