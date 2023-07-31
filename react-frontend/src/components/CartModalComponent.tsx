import { Modal, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import { ItemsContext } from "../contexts/ItemsContext";
import ItemModel from "../models/ItemModel";
import axios from "axios";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModalComponent = ({ showModal, setShowModal }: Props) => {
  const cart = useContext(ShoppingCartContext);
  const itemsContext = useContext(ItemsContext);
  const [items, setItems] = useState<ItemModel[]>([]);
  const itemsCount = cart.cartItems.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );

  useEffect(() => {
    const temp_items: ItemModel[] = [];
    cart.cartItems.map(async (cartItem) => {
      const itm = await itemsContext.getItem(cartItem.id);
      temp_items.push(itm);
    });
    setItems(temp_items);
  }, [cart, itemsContext]);

  const handleCheckout = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/checkout`, {
      items: cart.cartItems,
    });
    window.location.assign(data.url);
  };

  return (
    <>
      <div className="modal">
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title> Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {itemsCount <= 0 ? (
              "Your cart is empty."
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.id}>
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">{`Quantity ${
                      cart.cartItems.find((cartItem) => cartItem.id === item.id)
                        ?.quantity
                    }`}</div>
                    <div className="item-price">{item.price}</div>
                    <hr />
                  </div>
                ))}
                <Button variant="success" onClick={handleCheckout}>
                  Proceed To Checkout
                </Button>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CartModalComponent;
