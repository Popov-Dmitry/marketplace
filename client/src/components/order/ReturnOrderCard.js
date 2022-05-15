import React from 'react';
import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";

const ReturnOrderCard = () => {
    const order = useSelector(state => state.orderReducer.currentOrder);
    console.log(order.ret)

    return (
        <Card className={"mt-2 border-radius-10 shadow-sm"}>
            <div className={"p-2 ms-3 fs-5"}>
                <div>
                    <div className={"fw-bold"}>Причина возврата</div>
                    {order.ret &&
                        <div>
                            {order.ret.reason === "FIT" && "Товар не подошел"}
                            {order.ret.reason === "QUALITY" && "Проблемы с качеством товара"}
                            {order.ret.reason === "COUNT" && "Несоответствие количества"}
                            {order.ret.reason === "OTHER" && "Другое"}
                        </div>
                    }
                </div>
                <div>
                    <div className={"fw-bold"}>Описание проблемы</div>
                    {order.ret &&
                        <div>{order.ret.description}</div>
                    }
                </div>
            </div>
        </Card>
    );
};

export default ReturnOrderCard;