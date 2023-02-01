import { useQuery } from "react-query";
import SummaryChart from "./Charts/SummaryChart";
import { ErrorBoundary } from "react-error-boundary";
import { useMemo } from "react";
import { compareASC, compareDESC, clean50 } from "./utilities/compare";
import SummaryDataTable from "./Tables/SummaryDataTable";

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

type IDataRow = {
  date: string;
  count: string;
};

type IData = {
  summaryText: string;
  raw: IDataRow[];
};

function sortDataAsc(data: IData | undefined) {
  if (
    data !== null &&
    data !== undefined &&
    data.raw &&
    Array.isArray(data.raw) &&
    data.raw.length > 0
  ) {
    const rawData = JSON.parse(JSON.stringify(data.raw));
    return rawData.sort(compareASC);
  } else {
    return [];
  }
}
function sortDataDesc(data: IData | undefined) {
  if (
    data !== null &&
    data !== undefined &&
    data.raw &&
    Array.isArray(data.raw) &&
    data.raw.length > 0
  ) {
    const rawData = JSON.parse(JSON.stringify(data.raw));
    return rawData.sort(compareDESC);
  } else {
    return [];
  }
}

function Summary(): JSX.Element {
  const { status, data, error, isFetching } = useSummary();
  const graphData: IDataRow[] = useMemo<IDataRow[]>(
    () => sortDataAsc(data),
    [data]
  );
  const tableData: IDataRow[] = useMemo<IDataRow[]>(
    () => sortDataDesc(data),
    [data]
  );

  async function getSummary() {
    const url = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_SUMMARY_CODE;
    const response = await fetch(`${url}/sum?code=${code}`);
    let json = await response.json();

    // From full date to readable data
    json.map((item: any) => {
      const newDate = item.date.slice(0, 10);
      item.date = newDate;
      return item;
    });

    const arrangedData = {
      summaryText: `Last scrape on ${json[0]?.date} with ${json[0]?.count} repos.`,
      raw: clean50(json),
    };
    return arrangedData;
  }

  function useSummary() {
    return useQuery(
      {
        queryKey: ["Summary"],
        queryFn: getSummary,
      }
      // , {
      //   onError: (error) => {
      //       console.log(error);
      //   }});
    );
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
