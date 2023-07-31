import { Card, Button } from "react-bootstrap";
import ItemModel from "../models/ItemModel";
import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import "../assets/styles/ShopCardComponent.css";

interface Props {
  item: ItemModel;
}

const ShopCardComponent = ({ item }: Props) => {
  const cart = useContext(ShoppingCartContext);
  const itemQuantity = cart.getItemQuantityId(item.id);
  return (
    <div>
      <Card style={{ width: "22rem" }} className="my-5">
        <Card.Img
          variant="top"
          className="p-5"
          src={item.imageLink}
          width={520}
          height={320}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.price}</Card.Text>
          {itemQuantity <= 0 ? (
            <Button
              variant="primary"
              onClick={() => cart.addToShoppingCartId(item.id)}
            >
              Add To Cart
            </Button>
          ) : (
            <div className="cart-buttons-and-text">
              <div className="cart-buttons">
                <Button
                  className="cart-button"
                  variant="success"
                  onClick={() => cart.addToShoppingCartId(item.id)}
                >
                  +
                </Button>
                <Button
                  className="cart-button"
                  variant="danger"
                  onClick={() => cart.removeFromShoppingCartId(item.id)}
                >
                  -
                </Button>
              </div>
              <div className="in-cart">{itemQuantity} In Cart</div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShopCardComponent;
