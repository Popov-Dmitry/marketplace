import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import CountControl from "../CountControl";
import {useHistory} from "react-router-dom";
import {CLOTHES_ROUTE} from "../../utils/consts";
import {useDispatch} from "react-redux";
import {selectItemCart} from "../../redux/actions";

const CartItem = ({item}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    if (item.hasOwnProperty("count") && document.getElementById("minus")) {
        if (item.count === 1) {
            document.getElementById("minus").classList.add("disabled");
        }
        else {
            document.getElementById("minus").classList.remove("disabled");
        }
    }

    const onProductClick = (event) => {
        history.push(CLOTHES_ROUTE + "/" + event.target.dataset.detailsId + "/" + event.target.dataset.id);
    }

    return (
        <Row>
            <Col md={1} className={"d-flex align-items-center"} style={{width: "40px"}}>
                <input
                    type="checkbox"
                    className="custom-checkbox"
                    id={item.id}
                    name={item.id}
                    value={item.id}
                    onChange={event => dispatch(selectItemCart(parseInt(event.target.id), event.target.checked))}
                />
                <label htmlFor={item.id}/>
            </Col>
            <Col md={2}>
                <Image
                    src={item.photo}
                    className={"ratio-3x4 text-black-50 cursor-pointer m-auto"}
                    data-details-id={item.product.id}
                    data-id={item.product.clothes[0].id}
                    data-product-type={item.productType}
                    onClick={onProductClick}
                />
            </Col>
            <Col>
                <div
                    className={"cursor-pointer"}
                    data-details-id={item.product.id}
                    data-id={item.product.clothes[0].id}
                    data-product-type={item.productType}
                    onClick={onProductClick}
                >
                    {item.product.title}
                </div>
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