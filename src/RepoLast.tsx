import { useQuery } from "react-query";
import "./App.css";
import { useSearchParams } from "react-router-dom";
import LastIssueDataTable from "./Tables/RepoLastIssueDataTable";
import LastCommitDataTable from "./Tables/RepoLastCommitDataTable";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from './Error';

function RepoLast(): JSX.Element {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const owner = searchParams.get("owner") || "";

  const { status, data, error, isFetching } = useRepoLast(
    searchParams.get("name") || "",
    searchParams.get("owner") || ""
  );

  async function getData() {
    const urlBase = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_LAST_CODE;

    if (!!urlBase === false) throw Error("Repo: urlBase is empty");
    if (!!code === false) throw Error("Repo: code is empty");

    const url = `${urlBase}/last?repo=${name}&owner=${owner}&code=${code}`;

    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
  function useRepoLast(repoName: string, owner: string) {
    if (!!repoName === false) throw Error("RepoLast::useRepo repoName is empty");
    if (!!owner === false) throw Error("RepoLast::useRepo owner is empty");

    return useQuery({
      queryKey: ["RepoLast", repoName, owner],
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

            {data?.lastIssue && (
              <LastIssueDataTable data={[data?.lastIssue]} name={name} />
            )}
            {data?.lastCommit && (
              <LastCommitDataTable data={[data?.lastCommit]} name={name} />
            )}
            {!data && <>No data found</>}
          </>
        )}
        <div>{isFetching ? "Background Updating..." : " "}</div>
      </div>
    </ErrorBoundary>
  );
}

export default RepoLast;
