import "./App.css";
import DataTableOrgMeta from "./Tables/OrgMetaDataTable";
import { ErrorBoundary } from "react-error-boundary";
import { useMemo, useState } from "react";
import { mostPopularRepo, mostProblematicRepo, intersectionOfGoodAndBadRepos } from "./utilities/query";
import { IWeightedRepo } from "./utilities/types"

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function OrgMeta({repos}:any): JSX.Element {

  const [loading, setLoading] = useState(true)
  const { goodRepos, badRepos, venn }  = useMemo(() => {

    setLoading(false)
    const goodR:IWeightedRepo[] = mostPopularRepo(repos) as IWeightedRepo[];
    const badR:IWeightedRepo[] = mostProblematicRepo(repos) as IWeightedRepo[];
    const venn:IWeightedRepo[] = intersectionOfGoodAndBadRepos(goodR, badR)
    return {
      goodRepos: goodR,
      badRepos: badR,
      venn
    }
    
  },[repos]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <div className="App">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {repos && (
              <div className="flex-parent-element">
              <DataTableOrgMeta className="flex-child-element" data={goodRepos} venn={venn} type={"good"} />
              <DataTableOrgMeta className="flex-child-element" data={badRepos} venn={venn} type={"bad"} />
              </div>
            )}
            {!repos && <>No data found</>}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default OrgMeta;
