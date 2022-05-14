import React from 'react';
import {Container} from "react-bootstrap";
import OrdersList from "../components/order/OrdersList";

const Orders = () => {
    return (
        <Container className={"mb-2"}>
            <OrdersList/>
        </Container>
    );
};

export default Orders;