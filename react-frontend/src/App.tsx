import NavbarComponent from "./components/NavbarComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/App.css";

import HomePage from "./pages/HomePage";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import { ItemsProvider } from "./contexts/ItemsContext";

const App = () => {
  return (
    <>
      <ItemsProvider>
        <ShoppingCartProvider>
          <NavbarComponent></NavbarComponent>
          <div className="body-container">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage></HomePage>} />
                <Route
                  path="/success"
                  element={<PaymentSuccessPage></PaymentSuccessPage>}
                />
                <Route
                  path="/cancel"
                  element={<PaymentCancelPage></PaymentCancelPage>}
                />
              </Routes>
            </BrowserRouter>
          </div>
        </ShoppingCartProvider>
      </ItemsProvider>
    </>
  );
};

export default App;
