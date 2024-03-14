import React from 'react'
import { Chart } from "react-google-charts";
import _ from 'lodash'
import moment from 'moment';

export default function SalesChart({ ordersAfterDates }) {
    // const chartData = [
    //     ["days", "sales"],
    //     ["02/07", 1000],
    //     ["02/08", 1170],
    //     ["02/09", 660],
    //     ["02/10", 1030],
    //     ["02/11", 1000],
    //     ["02/12", 1170],
    //     ["02/12", 660],
    //     ["02/13", 760],
    //     ["02/14", 1030],
    //     ["02/15", 1130],
    //     ["02/16", 1430],
    // ];

    const amtInDays = _.groupBy(ordersAfterDates, (item) => (moment.utc(item.updatedAt).format('YYYY-MM-DD')))

    const chartData = Object.keys(amtInDays).map(item=>{
        return [item, _.sum(amtInDays[item].map(data=> data.totalPrice))]
    })

    chartData.unshift(["days", "sales"])

    // console.log(totalValues)
    const chartOptions = {
        vAxis: { minValue: 0 },
        chartArea: { width: "85%", height: "70%" },
    };

    return (
        <Chart
            chartType="AreaChart"
            data={chartData}
            width={"100%"}
            height={"300px"}
            options={chartOptions}
        />
    )
}
