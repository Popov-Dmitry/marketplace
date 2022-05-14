import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveOrder} from "../../redux/actions";

const Summary = ({cart}) => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.cartReducer.selected);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        setDiscount(
            cart
                .filter(c => selected.includes(c.id) && c.product.clothes[0].price !== null)
                .reduce((prev, curr) =>
                    (prev + curr.count * (curr.product.clothes[0].regularPrice - curr.product.clothes[0].price)), 0)
        );
    }, [selected]);

    return (
        <div>
            <div className={"background-white p-4 border-radius-50 mt-3"}>
                <div className={"fs-3 fw-bold"}>Сумма заказа</div>
                <div className={"d-flex justify-content-between"}>
                    <div className={"fs-5"}>
                        Товары ({cart.filter(c => selected.includes(c.id))
                        .map(c => c.count)
                        .reduce((prev, curr) => (prev + curr), 0)})
                    </div>
                    <div className={"fs-5 fw-bold"}>
                        {cart.filter(c => selected.includes(c.id)).reduce((prev, curr) =>
                            (prev + curr.count * curr.product.clothes[0].regularPrice), 0)} &#x20bd;
                    </div>
                </div>
                <div className={"d-flex justify-content-between mt-1"}>
                    <div className={"fs-5"}>
                        Скидка
                    </div>
                    <div className={"fs-5 fw-bold"}>
                        {discount} &#x20bd;
                    </div>
                </div>
                <hr/>
                <div className={"d-flex justify-content-between"}>
                    <div className={"fs-5 fw-bold"}>Общая стоимость</div>
                    <div className={"fs-5 fw-bold"}>
                        {cart.filter(c => selected.includes(c.id)).reduce((prev, curr) =>
                            (prev + curr.count * curr.product.clothes[0].regularPrice), 0) - discount} &#x20bd;
                    </div>
                </div>
                <Button
                    variant={"main"}
                    className={"w-100 mt-4"}
                    onClick={() => {
                        if (selected.length > 0) {
                            cart
                                .filter(c => selected.includes(c.id))
                                .forEach(c => dispatch(saveOrder(c.productDetailsId, c.productId,
                                    c.count, c.customerId, "address", c.product.sellerId, c.productType,
                                    c.product.clothes[0].regularPrice, c.product.clothes[0].price, c.id)));
                            // history.push(ORDERS_ROUTE);
                        }
                    }}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};

export default Summary;