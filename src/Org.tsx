import React, { useState, useEffect } from "react";
import "./App.css";
import DataTableOrg from "./DataTableOrg";

const url = process.env.REACT_APP_FN_BASE;
const code = process.env.REACT_APP_FN_ORG_CODE;

function Org(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [collectionDate, setCollectionData] = useState("");

  useEffect(() => {
    fetch(`${url}/org?code=${code}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setData(data);
        setLoading(false);
        setCollectionData(data[0]?.customDateUploaded);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="App">
      {loading && <div>...Loading</div>}
      {!loading && (
        <>
          <div>Data collected on {collectionDate.slice(0, 10)}</div>
          <div>{data.length} repos</div>
          <DataTableOrg data={data} />
        </>
      )}
    </div>
  );
}

export default Org;
