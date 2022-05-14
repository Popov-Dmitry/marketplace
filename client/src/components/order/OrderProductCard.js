import React, {useMemo} from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import OrderStatus from "./OrderStatus";
import {useSelector} from "react-redux";
import {daysLag} from "../../utils/productUtils";
import {useHistory} from "react-router-dom";

const OrderProductCard = () => {
    const history = useHistory();
    const order = useSelector(state => state.orderReducer.currentOrder);
    const photos = useSelector(state => state.photoReducer.photosNames);
    const orderDaysLag = useMemo(() => daysLag(new Date().getTime(), new Date(order.orderDate).getTime()), [order]);

    return (
        <Card className={"mt-4 border-radius-10 shadow-sm"}>
            <Row>
                <Col md={2}>
                    {(photos.hasOwnProperty(order.productDetailsId)) &&
                        <Image
                            src={process.env.REACT_APP_API_URL + "photos/" + order.productType + "/" + order.productDetailsId + "/"
                                + order.productId + "/" + photos[order.productDetailsId].photosNames[0]}
                            className={"ratio-3x4 text-black-50 cursor-pointer m-auto cursor-pointer"}
                            style={{borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px"}}
                            onClick={() => history.push("/" + order.productType + "/" +
                                order.productDetailsId + "/" + order.productId)}
                        />
                    }
                </Col>
                <Col>
                    <div
                        className={"mt-2 fs-5 cursor-pointer"}
                        onClick={() => history.push("/" + order.productType.toLowerCase() + "/" +
                            order.productDetailsId + "/" + order.productId)}
                    >
                        <div>{order.title}</div>
                        <div>{order.variant}</div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className={"mt-2 fs-5 me-4"}>
                        <div>Номер заказа: {order.id}</div>
                        <div>Дата заказа: {new Date(order.orderDate).toLocaleDateString()}</div>
                        <div className={"mt-2"}>
                            <OrderStatus status={order.status}/>
                        </div>
                        {orderDaysLag < 15 && <div className={"mt-1"}>Вернуть товары</div>}
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default OrderProductCard;