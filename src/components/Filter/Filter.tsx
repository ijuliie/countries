import React from "react";
import "./Filter.css";

interface IProps {
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Filter: React.FC<IProps> = ({ handleSelectChange }) => {
  const regions = ["africa", "americas", "asia", "europe", "oceania"];

  return (
    <div className="select-wrapper">
      <select
        className="select"
        data-testid="select"
        id="region"
        onChange={handleSelectChange}
      >
        <option data-testid="hidden" className="hidden" value="">
          Filter by Region
        </option>
        {regions.map((region) => (
          <option
            className="region"
            data-testid={region}
            key={region}
            value={region}
          >
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
