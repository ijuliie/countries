import React, { useState } from "react";
import { ICountry, ICountry as Props } from "../Home/Home";
import axios from "axios";

interface IProps {
  country: Props["name"];
  setCountry: React.Dispatch<React.SetStateAction<Props["name"]>>;
  setCountries: (countries: ICountry[]) => void;
}

const Input: React.FC<IProps> = ({ country, setCountries, setCountry }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setCountry(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .get<ICountry[]>(`https://restcountries.com/v2/name/${country}`)
      .then((response) => {
        setCountries(response.data);
      });
    setCountry(country);
    setCountry("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
