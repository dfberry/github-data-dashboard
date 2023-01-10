import "./App.css";
import Org from "./Org";
import Repo from "./Repo";
import Summary from "./Summary";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider} from "react-query";

// Add by wrapping HTML with <ReactQueryDevtools initialIsOpen/>
//import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

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
