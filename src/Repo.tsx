import { useQuery } from "react-query";
import "./App.css";
//import { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import DataTableRepos from "./RepoDataTable";
import RepoLast from "./RepoLast";
import { ErrorBoundary } from "react-error-boundary";
//import {timeSeriesItem} from './Models/timeSeries';
//import {compareASC} from './utilities/compare';

type RepoItem = {
  forks: number;
  issues: number;
  customDateUploaded: Date;
  stars: number
  pr: number;
}

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function Repo(): JSX.Element {
  const [searchParams] = useSearchParams();
  const owner = searchParams.get("owner") || "";
  const name = searchParams.get("name") || "";

  // const [issues, setIssues] = useState<timeSeriesItem[]>();
  // const [prs, setPrs] = useState<timeSeriesItem[]>();
  // const [starts, setStars] = useState<timeSeriesItem[]>();
  // const [forks, setForks] = useState<timeSeriesItem[]>();



  const { status, data, error, isFetching } = useRepo(
    searchParams.get("name") || ""
  );

  async function getData():Promise<RepoItem[]> {
    const urlBase = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_REPO_CODE;

    if (!!urlBase === false) throw Error("Repo: urlBase is empty");
    if (!!code === false) throw Error("Repo: code is empty");

    const url = `${urlBase}/repo?name=${name}&code=${code}`;

    const response = await fetch(url);
    const json = await response.json();

    json.map((item: any) => {
      if(item && item.customDateUploaded && item.customDateUploaded.length>10){
        const newDate = item.customDateUploaded.slice(0, 10);
        item.date = newDate;
        return item;
      }
      return item;

    });

    // const ascSort = json.sort(compareASC);




    return json;
  }
  function useRepo(repoName: string) {
    if (!!repoName === false) throw Error("Repo::useRepo repoName is empty");

    return useQuery({
      queryKey: ["Repo", repoName],
      queryFn: getData,
    });
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <div className="App">
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {(error as Error).message}</span>
        ) : (
          <>
            {name && owner && (
              <RepoLast />
            )}
            {data && <DataTableRepos data={data} name={name} owner={owner} />}
            {!data && <>No data found</>}
          </>
        )}
        <div>{isFetching ? "Background Updating..." : " "}</div>
      </div>
    </ErrorBoundary>
  );
}

export default Repo;
