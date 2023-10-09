import useApp from "./context";
import useNotification from "./context/notification";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes";

function App() {
  const { pageTitle } = useApp();
  const { getNotification } = useNotification();
  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle} | Cash Get </title>
      </Helmet>
      <BrowserRouter>
        <IndexRoutes />
      </BrowserRouter>
      {getNotification()}
    </HelmetProvider>
  );
}

export default App;
