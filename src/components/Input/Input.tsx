import React, { useState } from "react";
import { ICountry, ICountry as Props } from "../Home/Home";
import axios from "axios";

interface IProps {
  country: Props["name"];
  setCountries: (countries: ICountry[]) => void
  setCountry: React.Dispatch<React.SetStateAction<Props["name"]>>
}

const Input: React.FC<IProps> = ({ country, setCountries, setCountry }) => {
  const handleRegion: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .get<ICountry[]>(`https://restcountries.com/v2/name/${country}`)
      .then((response) => {
        setCountries(response.data)
      });
    setCountry(country);
    setCountry("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={country} onChange={handleRegion} />
    </form>
  );
};

export default Input;
