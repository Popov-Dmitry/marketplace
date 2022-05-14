import React from 'react';

const OrderStatus = ({status}) => {
    return (
        <div
            className={`d-flex align-items-center justify-content-center p-1 ps-2 pe-2 border-radius-50 text-center text-light
                ${(status === "DELIVERED" || status === "RETURNED" || status === "CANCELED") ? 
                "background-gray" : "background-main"}`}
        >
            <div>
                {status === "CREATED" && "Создан"}
                {status === "ACCEPTED" && "Принят"}
                {status === "DELIVERY" && "Доставляется"}
                {status === "WAITING" && "Ожидает в точке выдачи"}
                {status === "DELIVERED" && "Доставлен"}
                {status === "RETURN" && "Возврат"}
                {status === "RETURNED" && "Возвращен"}
                {status === "CANCELED" && "Отменен"}
            </div>
        </div>
    );
};

export default OrderStatus;