import "./App.css";
import Org from "./Org";
import Repo from "./Repo";
import Summary from "./Summary";
import Layout from "./Layout";
import OrgMeta from "./OrgMeta";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {useState} from 'react'
import { IRepo } from './utilities/types' 

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

  const [dataset, setDataSet ] = useState<IRepo[]>()

  function setOriginalData(data:IRepo[]){
    setDataSet(data)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Org setDataSet={setOriginalData}/>} />
            <Route path="/repo" element={<Repo />} />
            <Route path="/orgmeta" element={<OrgMeta repos={dataset} />}/>
            <Route path="/summary" element={<Summary />} />
            <Route path="*" element={<Org />} />
          </Routes>
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
export default App;
