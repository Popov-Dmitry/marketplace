import React from 'react';
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";

const Summary = ({cart}) => {
    const selected = useSelector(state => state.cartReducer.selected);

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
                            (prev + curr.count * curr.product.clothes[0].price), 0)} &#x20bd;
                    </div>
                </div>
                <hr/>
                <div className={"d-flex justify-content-between"}>
                    <div className={"fs-5 fw-bold"}>Общая стоимость</div>
                    <div className={"fs-5 fw-bold"}>
                        {cart.filter(c => selected.includes(c.id)).reduce((prev, curr) =>
                            (prev + curr.count * curr.product.clothes[0].price), 0)} &#x20bd;
                    </div>
                </div>
                <Button variant={"main"} className={"w-100 mt-4"}>Оформить заказ</Button>
            </div>
        </div>
    );
};

export default Summary;