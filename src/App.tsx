import useApp from "./context";
import useNotification from "./context/notification";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes";
import useModal from "./context/modal";

function App() {
  const { pageTitle } = useApp();
  const { getNotification } = useNotification();
  const { getModal } = useModal();
  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle} | Cash Get </title>
      </Helmet>
      <BrowserRouter>
        <IndexRoutes />
      </BrowserRouter>
      {getNotification()}
      {getModal()}
    </HelmetProvider>
  );
}

export default App;
