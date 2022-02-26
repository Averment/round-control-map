import React, { useState, Fragment } from "react";
import MapComponent from "./MapComponent";
import { UnFormattedLocationData } from "../models/models";

const InputComponent = (): JSX.Element => {
  const [rawLocationArray, setRawLocatoionArray] = useState<
    Array<UnFormattedLocationData>
  >([]);
  const [smoothLocationArray, setSmoothLocatoionArray] = useState<
    Array<UnFormattedLocationData>
  >([]);
  const JSON5 = require("json5");

  const handleRawDataChange = (e: any): void => {
    e.preventDefault();
    const _rawValue = JSON5.parse(e.target[0].value);
    setRawLocatoionArray(_rawValue);
  };

  const handleSmoothDataChange = (e: any): void => {
    e.preventDefault();
    const _smoothValue = JSON5.parse(e.target[0].value);
    setSmoothLocatoionArray(_smoothValue);
  };

  return (
    <Fragment>
      <div className="input-bar">
        <div className="raw-input">
          <form onSubmit={(e: any) => handleRawDataChange(e)}>
            <label className="raw-input-label">Raw Input</label>
            <div className="color-icon-raw" />
            <textarea className="input-element" rows={7} cols={50} />
            <input type="submit" value="submit" />
          </form>
        </div>
        <div className="smooth-input">
          <form onSubmit={(e) => handleSmoothDataChange(e)}>
            <label className="smooth-input-label">Smooth Input</label>
            <div className="color-icon-smooth" />
            <textarea className="input-element" rows={7} cols={50} />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
      <MapComponent
        rawLocationArray={rawLocationArray}
        smoothLocationArray={smoothLocationArray}
      />
    </Fragment>
  );
};

export default InputComponent;
