import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
          </Form.Group>
          <Col>
            <Row className="py-2 ms-1">
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Row>
            <Row className="py-2 ms-1">
              <Form.Check
                type="radio"
                label="Meta Mask Wallet"
                id="Crypto"
                name="paymentMethod"
                value="Crypto"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Row>
            <Row className="py-2 ms-1">
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                id="cod"
                name="paymentMethod"
                value="cod"
                disabled
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Row>
          </Col>
          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
