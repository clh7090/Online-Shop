import React from "react";
import ItemModel from "../models/ItemModel";
import { getItemById, getItems } from "../services/ItemService";
import { createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

// initialize the values for the context
const ItemsContext = createContext<{
  items: ItemModel[];
  getItem: (id: string) => Promise<ItemModel>;
}>({
  items: [],
  getItem: () => new Promise<ItemModel>(() => {}),
});

const ItemsProvider = ({ children }: Props) => {
  const [items, setItems] = useState<ItemModel[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsData = await getItems();
      setItems(itemsData);
    };
    fetchItems();
  }, []);

  const getItem = async (id: string): Promise<ItemModel> => {
    const itemData: ItemModel = await getItemById(id);

    return itemData;
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        getItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export { ItemsContext, ItemsProvider };
