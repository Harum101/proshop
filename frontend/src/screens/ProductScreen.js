import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { showProductDetails } from "../actions/productActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useHistory has been changed to useNavigate

  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(showProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Select Qty:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </Row>
                  </Container>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
