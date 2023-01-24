import { useQuery } from "react-query";
import SummaryDataTable from "./SummaryDataTable";
import SummaryChart from "./Charts/SummaryChart";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function Summary(): JSX.Element {
  const { status, data, error, isFetching } = useSummary();

  async function getSummary() {
    const url = process.env.REACT_APP_FN_BASE;
    const code = process.env.REACT_APP_FN_SUMMARY_CODE;
    const response = await fetch(`${url}/sum?code=${code}`);
    const json = await response.json();

    json.map((item: any) => {
      const newDate = item.date.slice(0, 10);
      console.log(newDate);
      item.date = newDate;
      return item;
    });

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
            {data && <SummaryDataTable data={data} />}
            {!data && <>No data found</>}
          </>
        )}
        <div>{isFetching ? "Background Updating..." : " "}</div>
      </div>
      <SummaryChart data={data} />
    </ErrorBoundary>
  );
}

export default Summary;
