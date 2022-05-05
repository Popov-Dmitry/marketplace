import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {EDIT_PRODUCT_ROUTE, SELLER_PRODUCTS_ROUTE} from "../../utils/consts";
import {useDispatch} from "react-redux";
import {updateClothes} from "../../redux/actions";

const ChooseEdit = ({show, onHide, product}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [id, setId] = useState(0);
    const [choice, setChoice] = useState("")
    const [currentCount, setCurrentCount] = useState(0);
    const [add, setAdd] = useState(0);
    const [subtract, setSubtract] = useState(0);
    const [regularPrice, setRegularPrice] = useState(0);
    const [price, setPrice] = useState("");

    const onSaveClick = () => {
        if (choice === "count") {
            if ((add !== 0 && subtract !== 0) || (add - subtract !== 0)) {
                dispatch(updateClothes(product.id, id, null, null,
                    currentCount + add - subtract, null, null, null));
            }
        }
        if (choice === "price") {
            dispatch(updateClothes(product.id, id, null, null,
                null, regularPrice, price, null));
        }
        setStep(1);
        setChoice("");
        setId(0);
        setRegularPrice(0);
        setPrice("");
        setCurrentCount(0);
        setAdd(0);
        setSubtract(0);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {step === 1 && "Выберите действие"}
                    {step === 2 && "Выберите вариант товара"}
                    {step === 3 && choice === "count" && "Количество товара"}
                    {step === 3 && choice === "price" && "Цена товара"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 &&
                    <div>
                        <Button
                            variant={"outline-main"}
                            className={"text-start w-100"}
                            onClick={() => {
                                setStep(step + 1);
                                setChoice("count");
                            }}
                        >
                            Изменить количество товара
                        </Button>
                        <Button
                            variant={"outline-main"}
                            className={"text-start w-100 mt-2"}
                            onClick={() => {
                                setStep(step + 1);
                                setChoice("price");
                            }}
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
                            onClick={() => {
                                setStep(step + 1);
                                setChoice("info");
                            }}
                        >
                            Редактировать информацию о варианте товара
                        </Button>
                    </div>
                }
                {step === 2 &&
                    <div>
                        <div className={"d-flex flex-wrap"}>
                            {product.clothes.map(item => <div
                                    key={item.id}
                                    className={"product-item-param-hover product-item-param-border p-1 ps-2 pe-2 me-2 mt-1 fs-5 cursor-pointer"}
                                    onClick={() => {
                                        if (choice === "info") {
                                            history.push(SELLER_PRODUCTS_ROUTE + "/" + product.id + "/" + item.id + EDIT_PRODUCT_ROUTE);
                                        }
                                        if (choice === "count" || choice === "price") {
                                            setStep(step + 1);
                                            setId(item.id);
                                            if (choice === "count") {
                                                setCurrentCount(item.count);
                                            }
                                            if (choice === "price") {
                                                setRegularPrice(item.regularPrice);
                                                setPrice(item.price ? item.price : "");
                                            }
                                        }
                                    }}
                                >
                                    {item.color}, {item.size}
                                </div>
                            )}
                        </div>
                    </div>
                }
                {step === 3 && choice === "count" &&
                    <div className={"d-flex justify-content-between"}>
                        <div className={"w-25 text-center"}>
                            <Form.Label>Вычесть</Form.Label>
                            <Form.Control
                                className={"mb-2 border-radius-10"}
                                placeholder="Вычесть"
                                type={"number"}
                                value={subtract}
                                onChange={e => {
                                    if (e.target.value < 0) {
                                        e.target.value = e.target.value * -1;
                                    }
                                    if (e.target.value > currentCount) {
                                        e.target.value = currentCount;
                                    }
                                    setSubtract(parseInt(e.target.value));
                                }}
                            />
                        </div>
                        <div className={"text-center"}>
                            <div>Текущее количество</div>
                            <div className={"mt-2 fs-5"}>{currentCount}</div>
                        </div>
                        <div className={"w-25 text-center"}>
                            <Form.Label>Добавить</Form.Label>
                            <Form.Control
                                className={"mb-2 border-radius-10"}
                                placeholder="Добавить"
                                type={"number"}
                                value={add}
                                onChange={e => {
                                    if (e.target.value < 0) {
                                        e.target.value = e.target.value * -1;
                                    }
                                    setAdd(parseInt(e.target.value));
                                }}
                            />
                        </div>
                    </div>
                }
                {step === 3 && choice === "price" &&
                    <div className={"d-flex flex-column"}>
                        <div className={"d-flex justify-content-between"}>
                            <div className={"text-center"}>
                                <Form.Label>Обычная цена</Form.Label>
                                <Form.Control
                                    className={"mb-2 border-radius-10"}
                                    placeholder="Обычная цена"
                                    type={"number"}
                                    value={regularPrice}
                                    onChange={e => {
                                        if (e.target.value < 0) {
                                            e.target.value = e.target.value * -1;
                                        }
                                        setRegularPrice(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                            <div className={"text-center"}>
                                <Form.Label>Цена со скидкой</Form.Label>
                                <Form.Control
                                    className={"mb-2 border-radius-10"}
                                    placeholder="Цена со скидкой"
                                    type={"number"}
                                    value={price}
                                    onChange={e => {
                                        if (e.target.value < 0) {
                                            e.target.value = e.target.value * -1;
                                        }
                                        if (e.target.value >= regularPrice) {
                                            e.target.value = regularPrice - 1;
                                        }
                                        setPrice(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                        <Button
                            variant={"main"}
                            className={"mt-1 align-self-end"}
                            onClick={() => setPrice("")}
                        >
                            Убрать скидку
                        </Button>
                    </div>
                }
                {step > 1 &&
                    <div className={"d-flex justify-content-between"}>
                        <Button
                            variant={"main"}
                            className={"mt-3 mb-1"}
                            onClick={() => setStep(step - 1)}
                        >
                            Назад
                        </Button>
                        {step === 3 &&
                            <Button
                                variant={"main"}
                                className={"mt-3 mb-1"}
                                onClick={onSaveClick}
                            >
                                Сохранить
                            </Button>
                        }
                    </div>
                }
            </Modal.Body>
        </Modal>
    );
};

export default ChooseEdit;