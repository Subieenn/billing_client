import axios from "axios";
import { createContext, useState } from "react";

export const TableContext = createContext();

export const TableContextProvider = ({ children }) => {
  const [tablesData, setTablesData] = useState([])
  const [oneTable, setOneTable] = useState([])


  const FetchTablesData = async () => {
    const res = await axios.get("/tables/get");
    setTablesData(res.data)

  }

  const FetchOneTable = async (id) => {
    const res = await axios.get(`/tables/oneTable/get/${id}`);
    setOneTable(res.data)

  }

  const addOrders = async (id, values) => {
    await axios.post(`/tables/tableOrders/add/${id}`, values);
    FetchTablesData()
  }

  const deleteOrders = async (tableId, productId) => {
    await axios.delete(`/tables/tableOrders/delete/${tableId}/${productId}`);
    FetchTablesData()
  }

  const deleteAllOrders = async (id) => {
    await axios.patch(`/tables/deleteTableProducts/${id}`);
    setOneTable([])
  }

  const totalAmountInArray = () => {
    const totalAmount = oneTable?.tableOrders?.map((data) => {
      return Number(data.price)
    })
    return totalAmount;
  }
  

  return (
    <TableContext.Provider
      value={{
        FetchTablesData,
        tablesData,
        addOrders,
        FetchOneTable,
        oneTable,
        deleteOrders,
        totalAmountInArray,
        deleteAllOrders
      }}
    >
      {children}
    </TableContext.Provider>
  )
}