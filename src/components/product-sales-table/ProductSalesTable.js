import React from 'react'
import _ from 'lodash'
export default function ProductSalesTable(props) {

    return (
        <>
            {/* Table */}
            <table class="table product-sales-table" ref={props.ref}>
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Total Sales</th>
                        <th scope="col">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {props.sortedOrders?.map((orders, i) => {
                        // console.log(Object.keys(orders))
                        let quantityVal = _.sum(props.ordersWithQuantity[Object.keys(orders)[0]]?.map(item => item?.quantity))
                        let totalVal = _.sum(props.ordersWithQuantity[Object.keys(orders)[0]]?.map(item => item?.price))
                        return (<tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{Object.keys(orders)[0]}</td>
                            <td>{quantityVal}</td>
                            <td>Nrs {totalVal}</td>
                        </tr>)
                    })
                    }
                </tbody>
            </table>

        </>
    )
}
