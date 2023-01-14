import "./App.css";
import Org from "./Org";
import Repo from "./Repo";
import Summary from "./Summary";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

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
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Org />} />
            <Route path="/repo" element={<Repo />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="*" element={<Org />} />
          </Routes>
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
export default App;
