import { useQuery } from "react-query";
import SummaryChart from "./Charts/SummaryChart";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from 'react';

type ScrapeTimeSeriesItem = {
  date: string;
  count: number;
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
function compareASC(a: any, b: any): any {
  if (a.date === b.date) return 0;
  return a < b ? 1 : -1;
}
function Summary(): JSX.Element {
  const { status, data, error, isFetching } = useSummary();

  const [lastScrape, setLastScrape] = useState<ScrapeTimeSeriesItem>()
  const [timeSeries, setTimeSeries ] = useState<ScrapeTimeSeriesItem[]>([]);

  async function getSummary() {
    const url = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_SUMMARY_CODE;
    const response = await fetch(`${url}/sum?code=${code}`);
    let json = await response.json();

    setLastScrape(json[0]);

    json.map((item: any) => {
      const newDate = item.date.slice(0, 10);
      console.log(newDate);
      item.date = newDate;
      return item;
    });
    setTimeSeries(json.sort(compareASC));
    return json;
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
            {data && <>Last scrape on {lastScrape?.date} with ${lastScrape?.count} repos.</>}
            {!data && <>No data found</>}
          </>
        )}
        <div>{isFetching ? "Background Updating..." : " "}</div>
      </div>
      <SummaryChart data={timeSeries} />
    </ErrorBoundary>
  );
}

export default Summary;
