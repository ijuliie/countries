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
      common: "",
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
    axios
      .get(`https://restcountries.com/v3.1/region/${value}`)
      .then((response) => {
        setCountries(response.data);
      });
  };

  return (
    <div className="home-container">
      <div className="form-container">
        <Input
          country={country}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <Filter handleSelectChange={handleSelectChange} />
      </div>
      <div className="countries-list" data-testid="countries-list">
        {countries.map((country, i) => {
          return (
            <div className="card" data-testid="country" key={i}>
              <Link className="links" to={`${country.name.common}`}>
                <div className="img-container">
                  <img className="img" src={country.flags.png} />
                </div>
                <div className="content">
                  <h3 className="card-title">{country.name.common}</h3>
                  <p>
                    <span className="label">Population:</span>{" "}
                    {country.population}
                  </p>
                  <p>
                    <span className="label">Region:</span> {country.region}
                  </p>
                  <p>
                    <span className="label">Capital:</span> {country.capital}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesList;
