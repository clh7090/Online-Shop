import ItemModel from "../models/ItemModel";
import axios from "axios";

const getItemById = async (id: string): Promise<ItemModel> => {
  const { data } = await axios.get<ItemModel[]>(
    `${process.env.REACT_APP_API_BASE_URL}/items/${id}`
  );
  return data[0];
};

const getItems = async (): Promise<ItemModel[]> => {
  const { data } = await axios.get<ItemModel[]>(`${process.env.REACT_APP_API_BASE_URL}/items`);
  return data;
};

export { getItemById, getItems };
