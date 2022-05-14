import React from 'react';
import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";

const OrderPriceSummary = () => {
    const order = useSelector(state => state.orderReducer.currentOrder);

    return (
        <Card className={"mt-2 border-radius-10 shadow-sm h-100"}>
            <div className={"d-flex p-2 ms-3"}>
                <div className={"fs-5"}>
                    <div>Цена:</div>
                    {order.price &&
                        <div>
                            <div>Скидка:</div>
                            <div>Цена с учетом скидки:</div>
                        </div>
                    }
                    <div>Количество:</div>
                    <div>Доставка:</div>
                    <div className={"fw-bold"}>
                        Итого:
                    </div>
                </div>
                <div className={"ms-4 fs-5"}>
                    <div>{order.regularPrice} &#x20bd;</div>
                    {order.price &&
                        <div>
                            <div>{order.regularPrice - order.price} &#x20bd;</div>
                            <div>{order.price} &#x20bd;</div>
                        </div>
                    }
                    <div>{order.count} шт.</div>
                    <div>Бесплатно</div>
                    <div className={"fw-bold"}>
                        {order.price ? order.price * order.count : order.regularPrice * order.count} &#x20bd;
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default OrderPriceSummary;