import React, { useState } from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import CountriesList from "./components/CountriesList/CountriesList";
import CountryDetails from './components/CountryDetails/CountryDetails'
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<CountriesList />} />
        <Route path='/:details' element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
