import React, {useEffect} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearPhotoStore, fetchOrder, fetchPhotosNames, fetchSeller} from "../../redux/actions";
import OrderStatusChart from "../../components/order/OrderStatusChart";
import OrderPriceSummary from "../../components/order/OrderPriceSummary";
import OrderProductCard from "../../components/order/OrderProductCard";

const Order = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const order = useSelector(state => state.orderReducer.currentOrder);
    const seller = useSelector(state => state.sellerReducer.currentSeller);
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => dispatch(fetchOrder(history.location.pathname.split("/")[3])), []);

    useEffect(() => {
        dispatch(clearPhotoStore());
        if (order.hasOwnProperty("productType") && order.hasOwnProperty("productDetailsId") && order.hasOwnProperty("productId")) {
            dispatch(fetchPhotosNames(order.productType, order.productDetailsId, order.productId));
        }
        if (order.hasOwnProperty("sellerId")) {
            dispatch(fetchSeller(order.sellerId));
        }
    }, [order]);

    return (
        <Container className={"mt-2"}>
            <OrderStatusChart status={order.status}/>
            <Card className={"mt-2 border-radius-10 shadow-sm"}>
                <div className={"p-2 ms-3 fs-5"}>
                    <div>
                        <div className={"fw-bold"}>Адрес доставки</div>
                        <div>{order.address}</div>
                    </div>
                    <div>
                        <div className={"fw-bold"}>Получатель</div>
                        <div>{user.firstName} {user.secondName}</div>
                        <div>{user.email}</div>
                    </div>
                </div>
            </Card>

            <OrderProductCard/>

            <Row>
                <Col>
                    <Card className={"mt-2 border-radius-10 shadow-sm h-100"}>
                        <div className={"p-2 ms-3 fs-5"}>
                            <div>Магазин <NavLink to={""}>{seller && seller.shopName}</NavLink></div>
                            <div>Написать продавцу</div>
                            <div>Оценить покупку</div>
                        </div>
                    </Card>
                </Col>
                <Col>
                    <OrderPriceSummary/>
                </Col>
            </Row>
        </Container>
    );
};

export default Order;