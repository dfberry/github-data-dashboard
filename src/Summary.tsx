import { useState, useEffect } from "react";
import SummaryDataTable from "./SummaryDataTable";

const url = process.env.REACT_APP_FN_BASE;
const code = process.env.REACT_APP_FN_SUMMARY_CODE;

function Summary(): JSX.Element {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect(() => {

      fetch(`${url}/sum?code=${code}`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((err) => console.log(err.message));
    }, []);
  
    return (
      <div className="App">
        {loading && <div>...Loading</div>}
        {!loading && (
          <>
            <SummaryDataTable data={data}  />
          </>
        )}
      </div>
    );
  }
  
  export default Summary;
  