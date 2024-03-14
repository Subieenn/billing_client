import Tabbar from "../../components/tabbar/Tabbar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductListManagement from "../../components/product-management/ProductListManagement";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/api/ProductContext"
import { AuthContext } from "../../context/AuthContext";

export default function ProductManagement() {
    const { FetchProducts } = useContext(ProductContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/product-management");
        } else {
            navigate("/login")
        }
        FetchProducts()
    }, [])

    return (
        <>

            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-md-100">
                        <Tabbar products="active" />
                    </div>

                    <div className="col-md-10 h-100 content-page">
                        <div className="products-box h-100">
                            <h3 className="main-header fs-22 py-2 pb-3 fw-600">Products Management</h3>
                            <div className="">
                                <Tabs
                                    defaultActiveKey="non-veg"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="non-veg" title="Snacks Non-veg">
                                        <ProductListManagement genre="snacks_nonveg" />
                                    </Tab>
                                    <Tab eventKey="veg" title="Snacks Veg">
                                        <ProductListManagement genre="snacks_veg" />
                                    </Tab>
                                    <Tab eventKey="drinks" title="Drinks">
                                        <ProductListManagement genre="drinks" />
                                    </Tab>
                                    <Tab eventKey="alcohol" title="Alcohol">
                                        <ProductListManagement genre="alcohol" />
                                    </Tab>
                                    <Tab eventKey="dessert" title="Dessert">
                                        <ProductListManagement genre="dessert" />
                                    </Tab>
                                    <Tab eventKey="extra" title="Extra">
                                        <ProductListManagement genre="extra" />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}