import axios from "axios";
import { createContext, useState } from "react";


export const RoomContext = createContext();



export const RoomContextProvider = ({ children }) => {
  const [roomData, setRoomData] = useState([])
  const [deluxe, setDeluxe] = useState([])
  const [superDeluxe, setSuperDeluxe] = useState([])


  const FetchRoomData = async () => {
    const res = await axios.get('/rooms/getRoom')
    setRoomData(res.data)
    setDeluxe(res.data[0].deluxe)
    setSuperDeluxe(res.data[0].superdeluxe)
  }

  const UpdateRoomData = async (data) => {
    const res = await axios.put('/rooms/updateRoom/63e3563620b075a25a0cccfa', data)
    setRoomData(res.data)
    setDeluxe(res.data[0].deluxe)
    setSuperDeluxe(res.data[0].superdeluxe)
  }

  return (
    <RoomContext.Provider
      value={{
        FetchRoomData,
        roomData,
        deluxe,
        superDeluxe,
        UpdateRoomData
      }
      }
    >
      {children}
    </RoomContext.Provider>
  )
}