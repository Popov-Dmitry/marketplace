import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import ToggleSwitch from "../ToggleSwitch";
import {positiveNumber} from "../../utils/productUtils";
import Checkbox from "../Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {saveDelivery} from "../../redux/actions";

const Delivery = ({show, onHide}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const [deliveryVariant, setDeliveryVariant] = useState("");
    const [deliveryPriceIncluded, setDeliveryPriceIncluded] = useState(true);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliveryPriceVariant, setDeliveryPriceVariant] = useState("");
    const [departureIndex, setDepartureIndex] = useState("");
    const [returnIndex, setReturnIndex] = useState("");
    const [packVariant, setPackVariant] = useState("");
    const [smsToSender, setSmsToSender] = useState(false);
    const [smsToRecipient, setSmsToRecipient] = useState(false);

    const onSaveClick = () => {
        let service = "";
        if (smsToSender && !smsToRecipient) {
            service = "41";
        }
        if (!smsToSender && smsToRecipient) {
            service = "42"
        }
        if (smsToSender && smsToRecipient) {
            service = "41,42"
        }
        dispatch(saveDelivery(deliveryVariant, deliveryPriceIncluded, deliveryPrice,
            deliveryPriceVariant, departureIndex, returnIndex, packVariant, service, user.id));
        setDeliveryVariant("");
        setDeliveryPriceIncluded(true);
        setDeliveryPrice(0);
        setDeliveryPriceVariant("");
        setDepartureIndex("");
        setReturnIndex("");
        setPackVariant("");
        setSmsToSender(false);
        setSmsToRecipient(false);
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Доставка
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form.Label className={"mt-2 opacity-95"}>Доставка <span className={"text-danger"}>*</span></Form.Label>
                    <Form.Select
                        id={"delivery-variant"}
                        className={"border-radius-10 w-75"}
                        value={deliveryVariant}
                        onChange={e => setDeliveryVariant(e.target.value)}
                    >
                        <option hidden>Доставка</option>
                        <option value="MY">Моя</option>
                        <option value="RUSSIAN_POST">Почта России</option>
                    </Form.Select>
                    {deliveryVariant.length > 0 &&
                        <div>
                            <Form.Label className={"mt-2 opacity-95"}>
                                Включена в стоимость <span className={"text-danger"}>*</span>
                            </Form.Label>
                            <ToggleSwitch
                                name={"deliveryPriceIncluded"}
                                checked={deliveryPriceIncluded}
                                onChange={(e) => setDeliveryPriceIncluded(e.target.checked)}
                            />
                            {!deliveryPriceIncluded && deliveryVariant === "MY" &&
                                <div>
                                    <Form.Label className={"mt-2 opacity-95"}>
                                        Стоимость доставки <span className={"text-danger"}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        id={"my-delivery-price"}
                                        className={"border-radius-10"}
                                        placeholder="Стоимость доставки"
                                        type={"number"}
                                        value={deliveryPrice}
                                        onChange={e => {
                                            positiveNumber(e);
                                            setDeliveryPrice(e.target.value);
                                        }}
                                    />
                                </div>
                            }
                            {!deliveryPriceIncluded && deliveryVariant === "RUSSIAN_POST" &&
                                <div>
                                    <Form.Label className={"mt-2 opacity-95"}>
                                        Стоимость доставки <span className={"text-danger"}>*</span>
                                    </Form.Label>
                                    <Form.Select
                                        id={"delivery-price-variant"}
                                        className={"border-radius-10 w-75"}
                                        value={deliveryPriceVariant}
                                        onChange={e => setDeliveryPriceVariant(e.target.value)}
                                    >
                                        <option hidden>Стоимость доставки</option>
                                        <option value="FIXED">Фиксированная</option>
                                        <option value="CALCULATE">Рассчитывать для каждого отправления</option>
                                    </Form.Select>
                                    {deliveryPriceVariant === "FIXED" &&
                                        <div>
                                            <Form.Control
                                                id={"fixed-delivery-price"}
                                                className={"mt-3 border-radius-10"}
                                                placeholder="Стоимость доставки"
                                                type={"number"}
                                                value={deliveryPrice}
                                                onChange={e => {
                                                    positiveNumber(e);
                                                    setDeliveryPrice(e.target.value);
                                                }}
                                            />
                                        </div>
                                    }
                                    {deliveryPriceVariant === "CALCULATE" &&
                                        <div>
                                            <Form.Label className={"mt-2 opacity-95"}>
                                                Индекс места отправления <span className={"text-danger"}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                id={"departure-index"}
                                                className={"border-radius-10"}
                                                placeholder="Индекс места отправления"
                                                value={departureIndex}
                                                onChange={e => setDepartureIndex(e.target.value)}
                                            />
                                            <Form.Label className={"mt-2 opacity-95"}>Индекс места вручения возврата</Form.Label>
                                            <Form.Control
                                                className={"border-radius-10"}
                                                placeholder="Индекс места вручения возврата"
                                                value={returnIndex}
                                                onChange={e => setReturnIndex(e.target.value)}
                                            />
                                            <Form.Label className={"mt-2 opacity-95"}>
                                                Упаковка <span className={"text-danger"}>*</span>
                                            </Form.Label>
                                            <Form.Select
                                                id={"pack-variant"}
                                                className={"border-radius-10 w-75"}
                                                value={packVariant}
                                                onChange={e => setPackVariant(e.target.value)}
                                            >
                                                <option hidden>Упаковка</option>
                                                <option value="10">Коробка «S»</option>
                                                <option value="11">Пакет полиэтиленовый «S»</option>
                                                <option value="12">Конверт с воздушно-пузырчатой пленкой «S»</option>
                                                <option value="20">Коробка «M»</option>
                                                <option value="21">Пакет полиэтиленовый «M»</option>
                                                <option value="22">Конверт с воздушно-пузырчатой пленкой «M»</option>
                                                <option value="30">Коробка «L»</option>
                                                <option value="31">Пакет полиэтиленовый «L»</option>
                                                <option value="40">Коробка «XL»</option>
                                                <option value="41">Пакет полиэтиленовый «XL»</option>
                                            </Form.Select>
                                            <a
                                                className={"fst-italic"}
                                                href="https://www.pochta.ru/support/post-rules/package-materials"
                                                target="_blank"
                                            >
                                                Посмотреть размеры
                                            </a>
                                            <div className={"mt-2"}>
                                                <div>
                                                    <Checkbox
                                                        name={"smsToSender"}
                                                        checked={smsToSender}
                                                        onChange={(e) => setSmsToSender(e.target.checked)}
                                                        text={"Пакет СМС уведомлений отправителю"}
                                                    />
                                                </div>
                                                <div>
                                                    <Checkbox
                                                        name={"smsToRecipient"}
                                                        checked={smsToRecipient}
                                                        onChange={(e) => setSmsToRecipient(e.target.checked)}
                                                        text={"Пакет СМС уведомлений получателю"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
                <Button
                    variant={"main"}
                    className={"mt-3 border-radius-10 float-end"}
                    onClick={onSaveClick}
                >
                    Сохранить
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default Delivery;