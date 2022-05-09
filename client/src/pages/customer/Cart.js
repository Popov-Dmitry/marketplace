import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {fetchClothes} from "../../http/clothesProductApi";
import {fetchPhotosNames} from "../../http/photoApi";
import Summary from "../../components/cart/Summary";
import CartItem from "../../components/cart/CartItem";
import EmptyCart from "../../components/cart/EmptyCart";
import TopControls from "../../components/cart/TopControls";

const Cart = () => {
    const cart = useSelector(state => state.cartReducer.info);
    const [isRequestsDone, setIsRequestsDone] = useState(false);

    useEffect(async () => {
        if (!isRequestsDone) {
            for (let c of cart) {
                try {
                    c.product = await fetchClothes(c.productDetailsId, c.productId);
                    const respPhotos = await fetchPhotosNames("CLOTHES", c.productDetailsId, c.productId);
                    c.photo = process.env.REACT_APP_API_URL + "photos/CLOTHES/" +
                        c.productDetailsId + "/" + c.productId + "/" + respPhotos[0];
                }
                catch (e) {
                    console.log(e);
                }
            }
            if (cart.length && cart[0].hasOwnProperty("product")) {
                setIsRequestsDone(true);
            }
        }
    }, [cart]);

    return (
        <div className={"background-light"}>
            <Container>
                {cart.length ?
                    <Row>
                        <Col>
                            <div className={"mt-3 mb-5 background-white border-radius-10 p-4"}>
                                <div className={"fs-3 fw-bold"}>Корзина ({cart.length})</div>
                                {isRequestsDone &&
                                    <div className={"mt-4"}>
                                        <TopControls cart={cart}/>
                                        <div className={"mt-2"}>
                                            {cart.map(item => <CartItem key={item.id} item={item}/>)}
                                        </div>
                                    </div>
                                }
                            </div>
                        </Col>
                        <Col md={4}>
                            {isRequestsDone &&
                                <Summary cart={cart}/>
                            }
                        </Col>
                    </Row>
                    :
                    <EmptyCart/>
                }
            </Container>
        </div>
    );
};

export default Cart;