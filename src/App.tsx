import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Org from "./Org";
import OrgMeta from "./OrgMeta";
import Repo from "./Repo";
import Summary from "./Summary";
import { IRepo, ISummaryAggregateItem } from './utilities/types';
import { aggregateSummaryDate } from './utilities/query';

// Add by wrapping HTML with <ReactQueryDevtools initialIsOpen/>
//import { ReactQueryDevtools } from 'react-query/devtools';

const minutes = 60; // minutes in an hour
const oneMinute = 60 * 1000; // milliseconds in minute

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: oneMinute * minutes * 24, // 24 hours
      cacheTime: oneMinute * minutes * 23, // 23 hours
    },
  },
});

function App(): JSX.Element {

  const [dataset, setDataSet ] = useState<IRepo[]>([])
  const [summaryAggregatedData, setSummaryAggregatedData] = useState<ISummaryAggregateItem[]>([])

  function setOriginalData(data:IRepo[]){

    const sum:ISummaryAggregateItem[] = aggregateSummaryDate(data)

    setDataSet(data)
    setSummaryAggregatedData(sum) 
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Org setDataSet={setOriginalData}/>} />
            <Route path="/repo" element={<Repo />} />
            <Route path="/orgmeta" element={<OrgMeta repos={dataset} />}/>
            <Route path="/summary" element={<Summary aggData={summaryAggregatedData} />} />
            <Route path="*" element={<Org />} />
          </Routes>
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
export default App;
