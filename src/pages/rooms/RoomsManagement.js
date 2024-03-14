import Tabbar from "../../components/tabbar/Tabbar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductListManagement from "../../components/product-management/ProductListManagement";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/api/ProductContext"
import { AuthContext } from "../../context/AuthContext";
import SingleProductManagement from "../../components/product-management/SingleProductManagement";
import SingleRoom from "../../components/rooms/SingleRoom";
import { RoomContext } from "../../context/api/RoomContext";

export default function RoomsManagement() {
    const { UpdateRoomData } = useContext(RoomContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/room-management");
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <>

            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-md-100">
                        <Tabbar rooms="active" />
                    </div>

                    <div className="col-md-10 h-100 content-page">
                        <div className="products-box h-100">
                            <h3 className="main-header fs-22 py-2 pb-3 fw-600">Rooms Management</h3>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-lg-0 mb-3">
                                    <SingleRoom cat="Deluxe" price="3000"/>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-lg-0 mb-3">
                                    <SingleRoom cat="Super Deluxe" price="3500"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}