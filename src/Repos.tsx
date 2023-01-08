import React, { useState, useEffect } from "react";
import "./App.css";
import { RequestOptions } from "https";
import DataTableRepos from './DataTableRepos';

const url = process.env.REACT_APP_FN_BASE;
const code = process.env.REACT_APP_FN_CODE;

function Repos(): JSX.Element {

  const [data, setData] = useState([]);

  var requestOptions:RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {
    fetch(`${url}/repo?name=js-e2e&code=${code}`,requestOptions)
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => {
      console.log(data)
      setData(data)
  })
    .catch(err=>console.log(err.message))
  },[])



  return (
    <div className="App">

          <DataTableRepos data={data} />

    </div>
  );
}

export default Repos;