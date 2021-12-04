import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import Input from "../Input/Input";
import axios from "axios";
import "./CountriesList.css";

export interface ICountry {
  flags: { png: string };
  name: { common: string };
  population: number;
  region: string;
  capital: string;
}
[];

// create a variable to hold state until it is retrieved from the API
const defaultCountry: ICountry[] = [];

const CountriesList: React.FC = () => {
  const [countries, setCountries]: [
    // tells typescript that I'm assigning a specific type to state
    ICountry[],
    (countries: ICountry[]) => void
  ] = useState(defaultCountry);
  const [country, setCountry] = useState<ICountry["name"]>({ common: "" });
  const [region, setRegion] = useState<ICountry["region"]>("");

  useEffect(() => {
    // fetch countries
    axios
      .get<ICountry[]>(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .get<ICountry[]>(`https://restcountries.com/v3.1/name/${country.common}`)
      .then((response) => {
        setCountries(response.data);
      });
    setCountry({
      common: ""
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setCountry({
      common: value,
    });
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const value = e.target.value;
    // setRegion(value)
    axios
      .get(`https://restcountries.com/v3.1/region/${value}`)
      .then((response) => {
        setCountries(response.data);
        // console.log(response);
      });
  };

  return (
    <div className="home-container">
      <Input
        country={country}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Filter handleSelectChange={handleSelectChange} setRegion={setRegion} />
      <div className="countries-list" data-testid="countries-list">
        {countries.map((country, i) => {
          return (
            <div className="card" data-testid="country" key={i}>
              <Link to={`${country.name.common}`}>
                <div className="img-container">
                  <img className="img" src={country.flags.png} />
                </div>
                <p>{country.name.common}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesList;
