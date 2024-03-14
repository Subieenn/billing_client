import { useContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PieChart from "../../components/chart/PieChart";
import ProductSalesTable from "../../components/product-sales-table/ProductSalesTable";
import Tabbar from "../../components/tabbar/Tabbar";
import { OrderContext } from "../../context/api/OrderContext";
import _ from "lodash";
import moment from "moment";

export default function Dashboard() {
  const state = {
    curDT: new Date().toLocaleString(),
  }
  const [dayDate, setDayDate] = useState("");


  const { FetchOrdersData, ordersData } = useContext(OrderContext)


  useEffect(() => {
    FetchOrdersData()
  }, [])


  var list = _.groupBy(ordersData, function (item) {
    return (moment.utc(item.updatedAt).format('YYYY-MM-DD'));
  })

  if(dayDate === ""){
    var oneData = Object.values(list)[0]?.map(oneDayOrders => {
      return oneDayOrders?.orders
    })
  }else{
    var oneData = list[dayDate]?.map(oneDayOrders => {
      return oneDayOrders?.orders
    })
  }


  // console.log(list["2023-02-15"])
  const allOrders = _.flatten(oneData)

  const ordersWithQuantity = _.groupBy(allOrders, item => {
    return item?.productsName;
  })

  const sortedData = Object.keys(ordersWithQuantity).map(item => {
    return { [item]: _.sum(ordersWithQuantity[item]?.map(item=> item?.quantity)) }
  })

  const sortedOrders = sortedData.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);;
  
  const tableData = useRef();


  return (
    <>

      <div className="page-container">
        <div className="row h-100">
          <div className="col-2 h-md-100">
            <Tabbar productSales="active" />
          </div>

          <div className="col-md-10 h-100">
            <div className="dashboard overflow-auto scrollbar h-100" >
              <div>
                <h3 className="fw-600">Product Sales</h3>
                <p className="text-info">{state.curDT} </p>
                <hr />
              </div>

              {/* 1st Data Row */}
              <div className="d-flex jusify-content-betweeen">
                <PieChart ordersWithQuantity={ordersWithQuantity} />

                <div className="d-flex flex-column h-100 align-items-between">
                  <div className="ms-md-auto d-flex flex-md-row flex-column">
                    <div className="me-4">
                      <h6>Day</h6>
                      <input className="form-control" type="date" onChange={e => setDayDate(e.target.value)}/>
                    </div>
                  </div>
                  <ReactToPrint
                    trigger={() => {
                      return <button className="btn btn-success border-2 mt-5 w-50 fs-19 ms-auto text-white">
                        <i className="fa-solid fa-print" /> <span className="ms-1 text-white">Print</span>
                      </button>
                    }}
                    content={() => tableData.current}
                    pageStyle="print"
                  />
                </div>
              </div>
              <ProductSalesTable ref={tableData} ordersWithQuantity={ordersWithQuantity} sortedOrders={sortedOrders} />
            </div>
          </div>
        </div>
      </div>
      <Outlet />

    </>
  )
}