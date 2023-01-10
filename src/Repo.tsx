import { useState, useEffect} from "react";
import "./App.css";
import { useSearchParams } from "react-router-dom";
import DataTableRepos from "./RepoDataTable";

const url = process.env.REACT_APP_FN_BASE;
const code = process.env.REACT_APP_FN_REPO_CODE;

function Repo(): JSX.Element {
  
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [repo, setRepo] = useState({});
  const name = searchParams.get("name") || "";

  useEffect(() => {

    async function getData() {
      const response = await fetch(`${url}/repo?name=${name}&code=${code}`);
      const json = await response.json();
      setLoading(false);
      setRepo(json);
      return json;
    }

    getData();
  }, [name]);

  return (
    <div className="App">
      {loading && <div>...Loading</div>}
      {!loading && (
        <>
          <DataTableRepos data={repo} name={name} />
        </>
      )}
    </div>
  );
}

export default Repo;
