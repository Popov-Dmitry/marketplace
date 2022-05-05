import React, {useState} from 'react';
import {Button, Col, Modal, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {EDIT_PRODUCT_ROUTE, SELLER_PRODUCTS_ROUTE} from "../../utils/consts";

const ChooseEdit = ({show, onHide, product}) => {
    const history = useHistory();
    const [step, setStep] = useState(1);

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {step === 1 && "Выберите действие" }
                    {step === 2 && "Выберите вариант товара" }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 &&
                    <div>
                        <Button
                            variant={"outline-main"}
                            className={"text-start w-100"}
                            onClick={() => setStep(step + 1)}
                        >
                            Изменить количество товара
                        </Button>
                        <Button
                            variant={"outline-main"}
                            className={"text-start w-100 mt-2"}
                            onClick={() => setStep(step + 1)}
                        >
                            Изменить цену и скидку товара
                        </Button>
                        <Button
                            variant={"outline-main"}
                            className={"text-start w-100 mt-2"}
                            onClick={() => history.push(SELLER_PRODUCTS_ROUTE + "/" + product.id + EDIT_PRODUCT_ROUTE)}
                        >
                            Редактировать общую информацию
                        </Button>
                        <Button
                            variant={"outline-main"}
                            className={"text-start w-100 mt-2"}
                            onClick={() => setStep(step + 1)}
                        >
                            Редактировать информацию о варианте товара
                        </Button>
                    </div>
                }
                {step === 2 &&
                    <div>
                        <div className={"d-flex flex-wrap"}>
                            {product.clothes.map(item => <div
                                    className={"product-item-param-hover product-item-param-border p-1 ps-2 pe-2 me-2 mt-1 fs-5 cursor-pointer"}
                                    onClick={() => history.push(SELLER_PRODUCTS_ROUTE + "/" + product.id + "/" + item.id + EDIT_PRODUCT_ROUTE)}
                                >
                                    <span>{item.color}, </span>
                                    <span>{item.size}</span>
                                </div>
                            )}
                        </div>
                        <Button
                            variant={"main"}
                            className={"mt-3 mb-1"}
                            onClick={() => setStep(step - 1)}
                        >
                            Назад
                        </Button>
                    </div>
                }
            </Modal.Body>
        </Modal>
    );
};

export default ChooseEdit;