import { createContext, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [productData, setProductData] = useState([])
  const [updatedName, setUpdatedName] = useState([])
  const [updatedPrice, setUpdatedPrice] = useState([])
  const [updatedGenre, setUpdatedGenre] = useState([])

  const FetchProducts = async () => {
    const res = await axios.get('/product/getAll')
    setProductData(res.data)
  }

  const Search =async(query)=>{
    const res = await axios.get(`/product/getBySearch?product=${query}`)
    setProductData(res.data)
  }


  const AddProducts = async (values) => {
    const res = await axios.post(`/product/add`, values)
    setProductData([...productData, res.data])
  }

  const DeleteProduct = async (id) => {
    await axios.delete(`/product/delete/${id}`)
    setProductData(productData.filter(product=> product._id !== id))
  }

  const FindOne = async (id) => {
    const res = await axios.get(`/product/get/${id}`)
    console.log(res.data)
    setUpdatedName(res.data.name)
    setUpdatedPrice(res.data.price)
    setUpdatedGenre(res.data.genre)
  }

  const UpdateOne = async (id, values) => {
    await axios.patch(`/product/update/${id}`, values)
    FetchProducts()
  }

  return (
    <ProductContext.Provider
      value={{ 
        FetchProducts, 
        productData, 
        DeleteProduct, 
        AddProducts,
        FindOne, 
        UpdateOne,
        Search,
        setUpdatedName, 
        updatedName,
        updatedPrice,
        setUpdatedPrice,
        setUpdatedGenre,
        updatedGenre,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}