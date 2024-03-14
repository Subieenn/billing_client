import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
export default function Tabbar(props) {
    const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        navigate('/login')
    }

    return (
        <>
            <div className="tab w-100 px-2">
                <div className="w-100 d-md-block d-none">
                    <h3 className="fs-20 text-white text-center py-4 mb-4 brand"> <span className="text-primary">B</span>illing</h3>
                </div>
                <Link to="/" className={props.overview + " btn"}>
                    <i className="fi fa-solid fa-house"></i> <span>Overview</span>
                </Link>
                {user?.isAdmin &&
                    <>
                        <Link to="/product-management" className={props.products + " btn"}>
                            <i className="fi fa-solid fa-bowl-food"></i> <span>Products</span>
                        </Link>

                        <Link to="/room-management" className={props.rooms + " btn"}>
                            <i className="fi fa-solid fa-person-shelter"></i> <span>Rooms</span>
                        </Link>
{/* 
                        <Link to="/dashboard" className={props.dashboard + " btn"}>
                            <i className="fi fa-solid fa-chart-simple"></i> <span>Sales Dashboard</span>
                        </Link> */}

                        <Link to="/product-sales" className={props.productSales + " btn"}>
                            <i className="fi fa-brands fa-product-hunt"></i> <span>Product Sales</span>
                        </Link>
                    </>
                }
                <button className={props.logout + " btn text-primary"} onClick={handleLogout}>
                    <i className="fi fa-solid fa-right-from-bracket" ></i>  <span>Log Out</span>
                </button>
            </div>
        </>
    )
}