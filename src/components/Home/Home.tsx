import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import axios from "axios";
import "./Home.css";

export interface ICountry {
  name: string;
  population: number;
  region: string;
  capital: string;
}

// create a variable to hold state until it is retrieved from the API
const defaultCountry: ICountry[] = [];

const Home: React.FC = () => {
  const [countries, setCountries]: [
    // tells typescript that I'm assigning a specific type to state
    ICountry[],
    (countries: ICountry[]) => void
  ] = useState(defaultCountry);
  // const [region, setRegion] = useState<ICountry["region"]>("");

  const [country, setCountry] = useState<ICountry["name"]>("");

  useEffect(() => {
    // fetch countries
    axios
      .get<ICountry[]>(`https://restcountries.com/v2/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);
  

  // useEffect(() => {
  //   // fetch countries
  //   axios
  //     .get<ICountry[]>(`https://restcountries.com/v2/name/${country}`)
  //     .then((response) => {
  //      console.log(response)
  //     });
  // }, [country]);

  return (
    <div className="home-container">
      <Input country={country} setCountries={setCountries} setCountry={setCountry} />
      <div className="countries-list" data-testid="countries-list">
        {countries.map((country, i) => {
          return (
            <div data-testid="country" key={i}>
              {country.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
