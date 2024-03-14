import { Chart } from "react-google-charts";
import React from 'react'
import _ from 'lodash'

export default function PieChart({ordersWithQuantity}) {

    // const data = [
    //     ["Product", "Sales"],
    //     ["Chicken Steam Momo", 11],
    //     ["Veg Momo", 2],
    //     ["Chicken Drum Stick", 2],
    //     ["Naan", 2],
    //     ["Roti", 7],
    //   ];
    
    const data = Object.keys(ordersWithQuantity)?.map((orders, i) => {
        let quantityVal = _.sum(ordersWithQuantity[orders]?.map(item => item?.quantity))
        return [orders, quantityVal]
    })
    data.unshift(["Product", "Sales"])


    // console.log(pieChartData)
    
      const options = {
        is3D: true,
      };
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"80%"}
            height={"300px"}
        />
    )
}