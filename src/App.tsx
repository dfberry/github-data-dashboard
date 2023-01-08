import React, { useState, useEffect } from "react";
import "./App.css";
import { RequestOptions } from "https";
import Org from './Orgs';

function App(): JSX.Element {

  return (
    <div className="App">

          <Org />

    </div>
  );
}

export default App;
