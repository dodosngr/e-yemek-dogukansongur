import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import EmptyCart from "../../components/Cart/EmptyCart";
import Footer from "../../components/common/Footer";
import Logo from "../../components/common/Logo";
import Menu from "../../components/common/Menu";
import MenuItem from "../../components/common/Menu/MenuItem";
import { selectCartItems, selectCartItemsCount, selectCartTotal } from "../../redux/cart/cart.selector";
import "./styles.css";
import { useState } from "react";
import axios from "axios";

const Cart = ({ cartCount, cartList, cartTotal }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [number, setNumber] = useState("");

  const sendMail = async () => {
    const requestObj = {
      name,
      email,
      addr,
      number,
      total: cartTotal,
      cartList
    };
    console.log("mail gitti");
    console.log(cartList);
    const response = await axios.post("http://localhost:5002/send-mail", requestObj);
    alert(response.data.message);
  };

  return (
    <>
      <div className="cart-header">
        {/* <Logo /> */}
      </div>
      {cartCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="orders">
          <h1 className="orders-heading">Your Orders</h1>
          <div className="orders-menu">
            <Menu list={cartList} />
          </div>
          <h3 className="orders-total">Your Total ${cartTotal}</h3>
          <div className="order-complete">
          <h3> Order complete </h3>

          <div className="form-group">
            <div className="d-flex flex-column">
              <div className="mail flex-row">
               <div className="mail-label"> 
              <label htmlFor="email" className="form-label m-2 h5">
                Email
              </label>
              </div>

              <div className="mail-input">
              <input
                type="email"
                name="mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                className="form-control"
                required
              />
              </div>
              </div>
              <div className="name">
              <div className="name-label">  
              <label htmlFor="name" className="form-label m-2 h5">
                Name Surname
              </label>
              </div>
              <div className="name-input">
              <input
                type="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                placeholder="Name"
                className="form-control"
                required
              />
              </div>
              </div>
              <div className="address-number">
               <div className="address-label"> 
              <label htmlFor="address" className="form-label m-2 h5">
                Address
              </label>
              </div>
              <div className="address-text">
              <textarea
                type="text"
                name="addr"
                onChange={(e) => {
                  setAddr(e.target.value);
                }}
                placeholder="Address"
                className="form-control"
                required
              />
              </div>

              <label htmlFor="Number" className="form-label m-2 h5">
                Number
              </label>
              <div className="number-input">
              <input
                type="Number"
                name="number"
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                placeholder="Number"
                className="form-control"
                required
              />
              </div>
              </div>
            </div>
          </div>
          <button onClick={sendMail} className="btn btn-primary my-3 h4">
            Complete Order
          </button>
          </div>      
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartCount: selectCartItemsCount,
  cartList: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(Cart);
