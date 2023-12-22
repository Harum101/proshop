import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen"; 
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/placeorder" Component={PlaceOrderScreen} />
            <Route path="/order/:id" Component={OrderScreen} />
            <Route path="/payment" Component={PaymentScreen} />
            <Route path="/shipping" Component={ShippingScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path="/login" Component={LoginScreen} />
            <Route path="/profile" Component={ProfileScreen} />
            <Route path="/product/:id" Component={ProductScreen} />
            <Route path="/cart/:id?" Component={CartScreen}></Route>{" "}
            <Route path="/" Component={HomeScreen} exact />
            {/* The ? in path means "id" is going to be optional since the Cart link wont have any id*/}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
