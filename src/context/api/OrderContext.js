import axios from "axios";
import { createContext, useState } from "react";


export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [ordersData, setOrdersData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [ordersAfterDates, setOrdersAfterDates] = useState([])
  const [oneOrder, setOneOrder] = useState([])

  const FetchOrdersData = async () => {
    const res = await axios.get("/orders/get")
    setOrdersData(res.data)
  }

  const FetchOneOrder = async (id) => {
    const res = await axios.get(`/orders/getOneOrders/${id}`)
    setOneOrder(res.data)
  }

  

  const FetchOrdersDataByDates = async (startDate, endDate) => {
    const res = await axios.get(`/orders/getByDates?startDate=${startDate}&endDate=${endDate}`)
    // setOrdersData(res.data)
    setOrdersAfterDates(res.data)
  }
  const AddOrdersData = async (values) => {
    const res = await axios.post("/orders/add", values)
    setOrdersData([...ordersData, res.data])
  }

  const openModalFun=(value)=>{
    setOpenModal(value)
  }

  return (
    <OrderContext.Provider
    value={{
      FetchOrdersData,
      AddOrdersData,
      ordersData,
      openModalFun,
      openModal,
      FetchOrdersDataByDates,
      ordersAfterDates,
      FetchOneOrder,
      oneOrder
    }}
    >
      {children}
    </OrderContext.Provider>
  )
}
