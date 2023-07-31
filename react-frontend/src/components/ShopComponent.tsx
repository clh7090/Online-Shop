import { Row, Col } from "react-bootstrap";
import ItemModel from "../models/ItemModel";
import ShopCardComponent from "./ShopCardComponent";
import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContext";

const ShopComponent = () => {
  const itemsContext = useContext(ItemsContext);

  return (
    <div>
      <Row xs={1} sm={1} md={2} lg={3} className="">
        {itemsContext.items.map((item: ItemModel, index) => (
          <Col align="center" key={index} className="">
            <ShopCardComponent item={item}></ShopCardComponent>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopComponent;
