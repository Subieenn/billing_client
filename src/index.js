import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./scss/index.scss";
import { BrowserRouter } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { ProductContextProvider } from './context/api/ProductContext';
import { TableContextProvider } from './context/api/TableContext';
import { OrderContextProvider } from './context/api/OrderContext';
import { RoomContextProvider } from './context/api/RoomContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomContextProvider>
        <OrderContextProvider>
          <TableContextProvider>
            <ProductContextProvider>
              <AuthContextProvider>
                <App />
              </AuthContextProvider>
            </ProductContextProvider>
          </TableContextProvider>
        </OrderContextProvider>
      </RoomContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
