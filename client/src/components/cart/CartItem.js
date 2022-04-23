import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import CountControl from "../CountControl";

const CartItem = ({item}) => {

    if (item.hasOwnProperty("count") && document.getElementById("minus")) {
        if (item.count === 1) {
            document.getElementById("minus").classList.add("disabled");
        }
        else {
            document.getElementById("minus").classList.remove("disabled");
        }
    }

    return (
        <Row>
            <Col md={1}>
                <Image
                    src={item.photo}
                    className={"ratio-3x4 text-black-50"}
                />
            </Col>
            <Col>
                <div>{item.product.title}</div>
                <div className={"text-black-50"}>
                    <span className={"text-lowercase"}>цвет {item.product.clothes[0].color},</span>
                    <span> размер {item.product.clothes[0].size}</span>
                </div>
            </Col>
            <Col md={2} className={"text-center"}>
                <div className={"fs-5 fw-bold"}>{item.product.clothes[0].price} &#x20bd;</div>
            </Col>
            <Col md={2} className={"text-center"}>
                <CountControl item={item}/>
            </Col>
            <hr className={"mt-3"}/>
        </Row>
    );
};

export default CartItem;