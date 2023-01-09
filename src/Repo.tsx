import { useState, useEffect } from "react";
import "./App.css";
import { useSearchParams } from "react-router-dom";
import DataTableRepos from "./DataTableRepos";

const url = process.env.REACT_APP_FN_BASE;
const code = process.env.REACT_APP_FN_REPO_CODE;

/*

<form className='d-flex' role='search'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </form>
*/

function Repo(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${url}/repo?name=${name}&code=${code}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        console.log(data);
        setLoading(false);
        setData(data);
      })
      .catch((err) => console.log(err.message));
  }, [name]);

  return (
    <div className="App">
      {loading && <div>...Loading</div>}
      {!loading && (
        <>
          <DataTableRepos data={data} name={name} />
        </>
      )}
    </div>
  );
}

export default Repo;
