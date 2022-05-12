import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import CountControl from "../CountControl";
import {useHistory} from "react-router-dom";
import {CLOTHES_ROUTE} from "../../utils/consts";
import {useDispatch} from "react-redux";
import {selectItemCart} from "../../redux/actions";
import Checkbox from "../Checkbox";

const CartItem = ({item}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onProductClick = (event) => {
        history.push(CLOTHES_ROUTE + "/" + event.target.dataset.detailsId + "/" + event.target.dataset.id);
    }

    return (
        <Row>
            <Col md={1} className={"d-flex align-items-center"} style={{width: "40px"}}>
                <Checkbox
                    name={item.id}
                    onChange={event => dispatch(selectItemCart(parseInt(event.target.id), event.target.checked))}
                />
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
                    <span> размер {item.product.clothes[0].size}, {item.product.clothes[0].weight}г</span>
                </div>
            </Col>
            <Col md={2} className={"text-center"}>
                {item.product.clothes[0].price ?
                    <div>
                        <div className={"fs-5 fw-bold"}>{item.product.clothes[0].price} &#x20bd;</div>
                        <div className={"fw-bold opacity-75"}>
                            <s>{item.product.clothes[0].regularPrice} &#x20bd;</s>
                        </div>
                    </div>
                    :
                    <div className={"fs-5 fw-bold"}>{item.product.clothes[0].regularPrice} &#x20bd;</div>
                }
            </Col>
            <Col md={2} className={"text-center"}>
                <CountControl item={item}/>
            </Col>
            <hr className={"mt-3"}/>
        </Row>
    );
};

export default CartItem;