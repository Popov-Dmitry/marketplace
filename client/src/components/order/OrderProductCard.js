import React, {useMemo, useState} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import OrderStatus from "./OrderStatus";
import {useDispatch, useSelector} from "react-redux";
import {daysLag} from "../../utils/productUtils";
import {useHistory} from "react-router-dom";
import {CUSTOMER, SELLER} from "../../utils/roles";
import {setCurrentOrderId, updateOrderStatus} from "../../redux/actions";
import Confirmation from "../modals/Confirmation";
import ReturnProduct from "../modals/ReturnProduct";

const OrderProductCard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const order = useSelector(state => state.orderReducer.currentOrder);
    const photos = useSelector(state => state.photoReducer.photosNames);
    const userRole = useSelector(state => state.userReducer.userRole);
    const orderDaysLag = useMemo(() => daysLag(new Date().getTime(), new Date(order.orderDate).getTime()), [order]);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isReturnVisible, setIsReturnVisible] = useState(false);

    const onUpdateOrderStatusClick = () => {
        switch (order.status) {
            case "CREATED":
                dispatch(updateOrderStatus(order.id, "ACCEPTED"));
                return;
            case "ACCEPTED":
                dispatch(updateOrderStatus(order.id, "DELIVERY"));
                return;
            case "DELIVERY":
                dispatch(updateOrderStatus(order.id, "WAITING"));
                return;
            case "WAITING":
                dispatch(updateOrderStatus(order.id, "DELIVERED"));
                return;
            case "RETURN":
                dispatch(updateOrderStatus(order.id, "RETURNED"));
                return;
            default:
                return;
        }
    }

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
                        {userRole === CUSTOMER && orderDaysLag < 15 && order.status === "DELIVERED" &&
                            <Button
                                variant={"outline-danger"}
                                className={"mt-3 border-radius-50 w-100"}
                                onClick={() => {
                                    dispatch(setCurrentOrderId(order.id));
                                    setIsReturnVisible(true);
                                }}
                            >
                                Вернуть товары
                            </Button>
                        }
                        {userRole === CUSTOMER && order.status === "CREATED" &&
                            <Button
                                variant={"outline-danger"}
                                className={"mt-3 border-radius-50 w-100"}
                                onClick={() => setIsConfirmationVisible(true)}
                            >
                                Отменить заказ
                            </Button>
                        }
                        {userRole === SELLER && (order.status === "CREATED" || order.status === "ACCEPTED" ||
                                order.status === "DELIVERY" || order.status === "WAITING" || order.status === "RETURN") &&
                            <div className={"mb-1"}>
                                <div className={"fs-3 text-center"}>
                                    &darr;
                                </div>
                                <Button
                                    variant={"outline-main"}
                                    className={"border-radius-50 w-100"}
                                    onClick={onUpdateOrderStatusClick}
                                >
                                    {order.status === "CREATED" && "Принять"}
                                    {order.status === "ACCEPTED" && "Передано в доставку"}
                                    {order.status === "DELIVERY" && "Ожидает получения"}
                                    {order.status === "WAITING" && "Доставлено"}
                                    {order.status === "RETURN" && "Возвращено"}
                                </Button>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
            <Confirmation
                show={isConfirmationVisible}
                onHide={setIsConfirmationVisible}
                onConfirm={() => dispatch(updateOrderStatus(order.id, "CANCELED"))}
                onCancel={setIsConfirmationVisible}
                text={"Отменить заказ?"}
            />
            <ReturnProduct show={isReturnVisible} onHide={setIsReturnVisible}/>
        </Card>
    );
};

export default OrderProductCard;