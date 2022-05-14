import React from 'react';
import {ORDERS_ROUTE} from "../../utils/consts";
import {Card, Col, Image, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import OrderStatus from "./OrderStatus";

const OrderItem = ({order}) => {
    const history = useHistory();
    const photos = useSelector(state => state.photoReducer.photosNames);

    return (
        <Card key={order.id} className={"mt-2 shadow-sm"}>
            <div
                className={"d-flex justify-content-between cursor-pointer background-light p-2"}
                onClick={() => history.push(ORDERS_ROUTE + "/" + order.id)}
            >
                <div>
                    <div>Номер заказа: {order.id}</div>
                    <div>Дата заказа: {new Date(order.orderDate).toLocaleDateString()}</div>
                </div>
                <OrderStatus status={order.status}/>
            </div>
            <Row>
                <Col md={2}>
                    {(photos.hasOwnProperty(order.productDetailsId)) &&
                        <Image
                            src={process.env.REACT_APP_API_URL + "photos/" + order.productType + "/" + order.productDetailsId + "/"
                                + order.productId + "/" + photos[order.productDetailsId].photosNames[0]}
                            className={"ratio-3x4 text-black-50 cursor-pointer m-auto"}
                            onClick={() => history.push(ORDERS_ROUTE + "/" + order.id)}
                        />
                    }
                </Col>
                <Col>
                    <div className={"mt-3"}>
                        <div>{order.title}</div>
                        <div>{order.variant}</div>
                    </div>
                </Col>
                <Col>
                    <div className={"float-end mt-3 me-3 fs-5 fw-bold"}>
                        {order.price ? order.price : order.regularPrice} &#x20bd;
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default OrderItem;