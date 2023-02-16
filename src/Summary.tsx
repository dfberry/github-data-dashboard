import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";
import SummaryChart from "./Charts/SummaryChart";
import SummaryAggregateDataTable from './Tables/SummaryAggregateDataTable';
import { ErrorFallback } from './Error';
import SummaryDataTable from "./Tables/SummaryDataTable";
import { clean50 } from "./utilities/compare";
import { sortByDateAsc, sortByDataDesc } from "./utilities/sort";
import { ISummary, ISummaryRow, ISummaryAggregateItem } from "./utilities/types";

function Summary({ aggData }: { aggData: ISummaryAggregateItem[]}) {

  const { status, data, error, isFetching } = useSummary();

  const graphData: ISummaryRow[] = useMemo<ISummaryRow[]>(
    () => sortByDateAsc(data?.raw),
    [data]
  );
  const tableData: ISummaryRow[] = useMemo<ISummaryRow[]>(
    () => sortByDataDesc(data?.raw),
    [data]
  );

  async function getSummary() {
    const url = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_SUMMARY_CODE;
    const response = await fetch(`${url}/sum?code=${code}`);
    let json = await response.json();

    // From full date to readable date
    json.map((item: any) => {
      const newDate = item.date.slice(0, 10);
      item.date = newDate;
      return item;
    });

    const arrangedData:ISummary = {
      summaryText: `Last scrape on ${json[0]?.date} with ${json[0]?.count} repos.`,
      raw: clean50(json),
    };
    return arrangedData;
  }

  function useSummary() {
    return useQuery({
      queryKey: ["Summary"],
      queryFn: getSummary,
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
            {data && (
              <>
                <p>{data.summaryText}</p>
                <SummaryChart data={graphData} />
                <SummaryAggregateDataTable data={aggData} />
                <SummaryDataTable data={tableData.slice(0, 30)} />
              </>
            )}
            {!data && <>No data found</>}
          </>
        )}
        <div>{isFetching ? "Background Updating..." : " "}</div>
      </div>
    </ErrorBoundary>
  );
}

export default Summary;
