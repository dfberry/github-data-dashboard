import "./App.css";
import DataTableOrgMeta from "./Tables/OrgMetaDataTable";
import { ErrorBoundary } from "react-error-boundary";
import { useMemo, useState } from "react";
import {
  filterActiveRepos,
  mostPopularRepo,
  mostProblematicRepo,
  intersectionOfGoodAndBadRepos,
} from "./utilities/query";
import { IWeightedRepo, IRepo } from "./utilities/types";
import { ErrorFallback } from "./Error";

function OrgMeta({ repos }: { repos: IRepo[] | undefined }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const { goodRepos, badRepos, venn } = useMemo(() => {
    setLoading(false);
    const activeReposOnly: IRepo[] =
      repos && repos.length > 0 ? (filterActiveRepos(repos) as IRepo[]) : [];
    const goodR: IWeightedRepo[] = mostPopularRepo(
      activeReposOnly
    ) as IWeightedRepo[];
    const badR: IWeightedRepo[] = mostProblematicRepo(
      activeReposOnly
    ) as IWeightedRepo[];
    const venn: string[] = intersectionOfGoodAndBadRepos(goodR, badR);

    return {
      goodRepos: goodR,
      badRepos: badR,
      venn,
    };
  }, [repos]);

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
                <DataTableOrgMeta
                  className="flex-child-element"
                  data={goodRepos}
                  venn={venn}
                  type={"good"}
                />
                <DataTableOrgMeta
                  className="flex-child-element"
                  data={badRepos}
                  venn={venn}
                  type={"bad"}
                />
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
