import { Route, Routes } from "react-router-dom";
import AddProductModal from "./components/modals/AddProductModal";
import DeleteConfirmationModal from "./components/modals/DeleteConfirmationModal";
import EditOrder from "./components/modals/EditOrder";
import EditProductModal from "./components/modals/EditProductModal";
import GetOneOrder from "./components/modals/GetOneOrder";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import OverviewPos from "./pages/overview/OverviewPos";
import Overview from "./pages/overview/OverviewTable";
import ProductManagement from "./pages/product-management/ProductManagement";
import ProductSales from "./pages/product-sales/ProductSales";
import RoomsManagement from "./pages/rooms/RoomsManagement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Overview />} />
        <Route path="/pos/:id" element={<OverviewPos />} >
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        <Route exact path="edit/:id" element={<EditOrder />} />
          <Route exact path="get/:id" element={<GetOneOrder />} />
        </Route>
        <Route exact path="/product-management" element={<ProductManagement />}>
          <Route exact path="add" element={<AddProductModal />} />
          <Route exact path="edit/:id" element={<EditProductModal />} />
          <Route exact path="delete/:id" element={<DeleteConfirmationModal />} />
        </Route>
        <Route path="/product-sales" element={<ProductSales />} />
        <Route path="/room-management" element={<RoomsManagement />} />
      </Routes>
    </>
  );
}

export default App;
