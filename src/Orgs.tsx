import React, { useState, useEffect } from "react";
import "./App.css";
import { RequestOptions } from "https";
import DataTableOrg from './DataTableOrg';

const url = process.env.REACT_APP_FN_BASE;
const code = process.env.REACT_APP_FN_ORG_CODE;

function Org(): JSX.Element {

  const [data, setData] = useState([]);
  const [collectionDate, setCollectionData] = useState("");

  var requestOptions:RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {
    fetch(`${url}/org?code=${code}`,requestOptions)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      setData(data);
        setCollectionData(data[0]?.customDateUploaded)

  })
    .catch(err=>console.log(err.message))
  },[])



  return (
    <div className="App">
          <div>Data collected on {collectionDate.slice(0,10)}</div>
          <DataTableOrg data={data} />

    </div>
  );
}

export default Org;
