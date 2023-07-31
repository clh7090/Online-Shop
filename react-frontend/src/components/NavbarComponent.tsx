import { useState, useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import "../assets/styles/NavbarComponent.css";
import CartModalComponent from "./CartModalComponent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const NavbarComponent = () => {
  const cart = useContext(ShoppingCartContext);

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="nav">
        <div
          className="logo-and-text"
          onClick={() => window.location.assign(`${process.env.REACT_APP_FRONTEND_BASE_URL}`)}
        >
          <div className="logo">
            {<LocalMallIcon style={{ fontSize: "2.9rem", color: "#60ab59" }} />}
          </div>
          <div className="logo-text">Grocery</div>
        </div>
        <div className="cart-icon">
          {
            <ShoppingCartIcon
              style={{ fontSize: "2.9rem" }}
              onClick={() => setShowModal(true)}
            />
          }
          <div className="cart-count-badge">{cart.getItemQuantity()}</div>
        </div>
      </div>
      <CartModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
      ></CartModalComponent>
    </>
  );
};

export default NavbarComponent;
