import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMatch } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./CountryDetails.css";
import countries from "i18n-iso-countries";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface IDetails {
  data: {
    flags: { png: string };
    name: Name;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    tld: Array<string>;
    currencies: {
      [key: string]: string;
    };
    languages: object;
    borders: Array<string>;
  }[];
}

interface Name {
  common: string;
  nativeName: {
    [key: string]: {
      official: string;
    };
  };
}

const CountryDetails: React.FC = () => {
  const [details, setDetails] = useState<IDetails["data"]>([]);
  const match = useMatch(":name");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountryDetails(match?.params.name);
  }, [match?.params.name]);

  const fetchCountryDetails = (country: any) => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => {
        setDetails(response.data);
      });
  };

  // loop through object with different keys
  const getNativeName = (data: any) => {
    for (let key in data.nativeName) {
      return data.nativeName[key].official;
    }
  };

  const getCurrency = (data: any) => {
    for (let key in data) {
      return data[key].name;
    }
  };

  return (
    <div className="details-container">
      <div className="back-button-wrapper">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="back button"
        >
          <FontAwesomeIcon
            style={{ paddingRight: "10px" }}
            icon={faArrowLeft}
          />
          Back
        </button>
      </div>
      {details.map((data) => {
        return (
          <div
            key={data.name.common}
            data-testid="details"
            className="details-wrapper"
          >
            <div className="box">
              <div className="details-img-wrapper">
                <img className="img-details" src={data.flags.png} />
              </div>
            </div>
            <div className="box">
              <div>
                <h2 className="detail-header">{data.name.common}</h2>
              </div>
              <div className="details-content">
                <div>
                  <p>
                    <span className="detail-label">Native Name:</span>{" "}
                    {getNativeName(data.name)}
                  </p>
                  <p>
                    <span className="detail-label">Population:</span>{" "}
                    {data.population.toLocaleString()}
                  </p>
                  <p>
                    <span className="detail-label">Region:</span> {data.region}
                  </p>
                  <p>
                    <span className="detail-label">Sub Region:</span>{" "}
                    {data.subregion}
                  </p>
                  <p>
                    <span className="detail-label">Capital:</span>{" "}
                    {data.capital}
                  </p>
                </div>
                <div className="details-content-2">
                  <p>
                    <span className="detail-label">Top Level Domain:</span>{" "}
                    {data.tld[0]}
                  </p>
                  <p>
                    <span className="detail-label">Currencies:</span>{" "}
                    {getCurrency(data.currencies)}
                  </p>
                  <p>
                    <span className="detail-label">Languages:</span>{" "}
                    {Object.entries(data.languages).map(
                      // 3rd argument in map function refers back to the original array that is being looped through
                      ([_, val], index, arr) => {
                        {
                          // if index is not equal length of array minus 1, add a comma
                        }
                        if (index != arr.length - 1) {
                          return `${val}, `;
                        } else {
                          return val;
                        }
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="border-wrapper">
                <div className="border-heading-wrapper">
                  <span className="detail-label">Border Countries: </span>
                </div>
                <div>
                  {data.borders
                    ? data.borders.map((country) => (
                        <button
                          className="border button"
                          onClick={() =>
                            fetchCountryDetails(
                              countries.getName(country, "en")
                            )
                          }
                          key={country}
                        >
                          <Link
                            className="links"
                            to={`/${countries.getName(country, "en")}`}
                          >
                            {countries.getName(country, "en")}
                          </Link>
                        </button>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountryDetails;
