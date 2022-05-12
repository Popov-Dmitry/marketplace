import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {
    addProduct,
    addProductPhotos,
    deletePhoto,
    saveProduct,
    showAlert,
    updateClothes,
    uploadPhotos
} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {blink} from "../../utils/uiUtils";
import {useHistory} from "react-router-dom";
import remove from "../../assets/remove.png";
import Confirmation from "../modals/Confirmation";
import {SELLER_NEW_PRODUCT_ROUTE, SELLER_PRODUCTS_ROUTE} from "../../utils/consts";
import ToggleSwitch from "../ToggleSwitch";
import {positiveNumber} from "../../utils/productUtils";
import Checkbox from "../Checkbox";

const ClothesProductEdit = ({clothes, setIsDone}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.userReducer.user);
    const [color, setColor] = useState((clothes && clothes.color) ? clothes.color : "");
    const [size, setSize] = useState((clothes && clothes.size) ? clothes.size : "");
    const [count, setCount] = useState((clothes && clothes.count) ? clothes.count : 0);
    const [regularPrice, setRegularPrice] = useState((clothes && clothes.regularPrice) ? clothes.regularPrice : 0);
    const [weight, setWeight] = useState((clothes && clothes.weight) ? clothes.weight : 0);
    const [photos, setPhotos] = useState([]);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const currentPhotos = useSelector(state => state.photoReducer.photosNames);
    const [detailsId, setDetailsId] = useState(0);
    const [id, setId] = useState(0);
    const [selectedPhoto, setSelectedPhoto] = useState("");

    const [deliveryVariant, setDeliveryVariant] = useState("");
    const [deliveryPriceIncluded, setDeliveryPriceIncluded] = useState(true);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliveryPriceVariant, setDeliveryPriceVariant] = useState("");
    const [departureIndex, setDepartureIndex] = useState("");
    const [returnIndex, setReturnIndex] = useState("");
    const [packVariant, setPackVariant] = useState("");
    const [smsToSender, setSmsToSender] = useState(false);
    const [smsToRecipient, setSmsToRecipient] = useState(false);

    useEffect(() => {
        setDetailsId(history.location.pathname.split("/")[3]);
        setId(history.location.pathname.split("/")[4]);
    }, []);

    const validation = () => {
        let errors = 0;
        if (color.trim().length < 1) {
            blink("color");
            errors++;
        }
        if (size === "") {
            blink("size");
            errors++;
        }
        if (photos.length < 1 && !clothes) {
            blink("files-input");
            errors++;
        }
        if (deliveryVariant.trim().length < 1) {
            blink("delivery-variant");
            errors++;
        }
        if (!deliveryPriceIncluded) {
            if (deliveryVariant === "RUSSIAN_POST") {
                if (deliveryPriceVariant.trim().length < 1) {
                    blink("delivery-price-variant");
                    errors++;
                }
                if (departureIndex.trim().length < 1) {
                    blink("departure-index");
                    errors++;
                }
                if (packVariant.trim().length < 1) {
                    blink("pack-variant");
                    errors++;
                }
            }
        }
        return errors === 0;
    };

    const onFileChange = (event) => {
        if ((currentPhotos[detailsId] && event.target.files.length + currentPhotos[detailsId].photosNames.length > 5) ||
            (!currentPhotos[detailsId] && event.target.files.length > 5)) {
            dispatch(showAlert("danger", "Загрузите до 5 изображений"));
            event.target.value = "";
            return;
        }
        const maxSize = 10 * 1024 * 1024;
        for (const file of event.target.files) {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                dispatch(showAlert("danger", "Тип файла должен быть png, jpeg или jpg"));
                event.target.value = "";
                return;
            }
            if(file.size > maxSize) {
                dispatch(showAlert("danger", "Максимальный размер файла 10МБ"));
                event.target.value = "";
                return;
            }
        }
        setPhotos(event.target.files);
    };

    return (
        <Form className={""}>
            <Form.Label className={"mt-2 opacity-95"}>Цвет <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"color"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Цвет"
                value={color}
                onChange={e => setColor(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Размер <span className={"text-danger"}>*</span></Form.Label>
            <Form.Select
                id={"size"}
                className={"mb-2 border-radius-10 w-25"}
                value={size}
                onChange={e => setSize(e.target.value)}
            >
                <option hidden>Размер</option>
                <option value="XXS">XXS</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
                <option value="XXXXL">XXXXL</option>
            </Form.Select>
            {!clothes &&
                <div>
                    <Form.Label className={"opacity-95"}>Количество <span className={"text-danger"}>*</span></Form.Label>
                    <Form.Control
                        className={"mb-2 border-radius-10 w-50"}
                        placeholder="Количество"
                        type={"number"}
                        value={count}
                        onChange={e => {
                            positiveNumber(e);
                            setCount(e.target.value);
                        }}
                    />
                    <Form.Label className={"opacity-95"}>Цена <span className={"text-danger"}>*</span></Form.Label>
                    <Form.Control
                        className={"mb-2 border-radius-10 w-50"}
                        placeholder="Цена"
                        type={"number"}
                        value={regularPrice}
                        onChange={e => {
                            positiveNumber(e);
                            setRegularPrice(e.target.value);
                        }}
                    />
                </div>
            }
            <Form.Label className={"opacity-95"}>Вес, г <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Вес"
                type={"number"}
                value={weight}
                onChange={e => {
                    positiveNumber(e);
                    setWeight(e.target.value);
                }}
            />
            <Form.Label className={"opacity-95"}>Изображения <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"files-input"}
                className={"border-radius-10 w-50"}
                type="file"
                accept={"image/jpeg,image/png"}
                multiple
                onChange={onFileChange}
            />
            <div className={"fw-light fst-italic mt-1"}>
                Загрузите до 5 изображений (каждая до 10МБ) в хорошем качестве.<br/>
                Рекомендованное соотношение сторон 3x4.
            </div>
            {currentPhotos[detailsId] &&
                <Row className={"mt-2 mb-2"}>
                    {currentPhotos[detailsId].photosNames.map(p =>
                        <Col md={2} key={p} className={"d-flex"}>
                            <Image
                                className={"remove-image-btn cursor-pointer"}
                                src={remove}
                                height={16}
                                width={16}
                                onClick={() => {
                                    setSelectedPhoto(p);
                                    setIsConfirmationVisible(true)
                                }}
                            />
                            <Image
                                src={process.env.REACT_APP_API_URL + "photos/CLOTHES/" +
                                    detailsId + "/" + id + "/" + p}
                            />
                        </Col>
                    )}
                </Row>
            }
            <div>
                <Form.Label className={"mt-2 opacity-95"}>Доставка <span className={"text-danger"}>*</span></Form.Label>
                <Form.Select
                    id={"delivery-variant"}
                    className={"border-radius-10 w-25"}
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
                                    className={"border-radius-10 w-50"}
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
                                    className={"border-radius-10 w-25"}
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
                                            className={"mt-3 border-radius-10 w-50"}
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
                                            className={"border-radius-10 w-50"}
                                            placeholder="Индекс места отправления"
                                            value={departureIndex}
                                            onChange={e => setDepartureIndex(e.target.value)}
                                        />
                                        <Form.Label className={"mt-2 opacity-95"}>Индекс места вручения возврата</Form.Label>
                                        <Form.Control
                                            className={"border-radius-10 w-50"}
                                            placeholder="Индекс места вручения возврата"
                                            value={returnIndex}
                                            onChange={e => setReturnIndex(e.target.value)}
                                        />
                                        <Form.Label className={"mt-2 opacity-95"}>
                                            Упаковка <span className={"text-danger"}>*</span>
                                        </Form.Label>
                                        <Form.Select
                                            id={"pack-variant"}
                                            className={"border-radius-10 w-25"}
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
            <div className={"mt-2 mb-3 w-50"}>
                {!clothes &&
                    <Button
                        variant={"main"}
                        className={"mt-2"}
                        onClick={() => {
                            if (!validation()) {
                                return;
                            }
                            if (!clothes) {
                                if (history.location.pathname === SELLER_NEW_PRODUCT_ROUTE) {
                                    const product = {color, size, count, regularPrice, weight};
                                    dispatch(addProduct(product));
                                    dispatch(addProductPhotos({...photos}));
                                }
                                else {
                                    const product = { color, size, count, regularPrice, weight };
                                    dispatch(saveProduct("CLOTHES", null, detailsId, product, {...photos}, user.id));
                                }
                            }
                            setColor("");
                            setSize("");
                            setCount(0);
                            setRegularPrice(0);
                            setWeight(0);
                            setPhotos([]);
                            document.getElementById("files-input").value = null;
                        }}
                    >
                        Добавить ещё вариант
                    </Button>
                }
                <Button
                    variant={"main"}
                    className={`mt-2 ${!clothes && "float-end"}`}
                    onClick={() => {
                        if (!validation()) {
                            return;
                        }
                        if (clothes) {
                            dispatch(updateClothes(detailsId, id, color, size, null, null, null, weight));
                            if (photos.length > 0) {
                                dispatch(uploadPhotos("CLOTHES", detailsId, id, photos));
                                setPhotos([]);
                                document.getElementById("files-input").value = null;
                                history.push(SELLER_PRODUCTS_ROUTE);
                            }
                        }
                        else {
                            if (history.location.pathname === SELLER_NEW_PRODUCT_ROUTE) {
                                const product = { color, size, count, regularPrice, weight };
                                dispatch(addProduct(product));
                                dispatch(addProductPhotos({...photos}));
                                setIsDone(true);
                            }
                            else {
                                const product = { color, size, count, regularPrice, weight };
                                dispatch(saveProduct("CLOTHES", null, detailsId, product, {...photos}, user.id));
                                history.push(SELLER_PRODUCTS_ROUTE);
                            }
                        }
                    }}
                >
                    {clothes ? "Сохранить" : "Завершить"}
                </Button>
            </div>

            <Confirmation
                show={isConfirmationVisible}
                onHide={setIsConfirmationVisible}
                onCancel={() => setSelectedPhoto("")}
                onConfirm={() => {
                    dispatch(deletePhoto("CLOTHES", detailsId, id, selectedPhoto));
                    setSelectedPhoto("");
                    setIsConfirmationVisible(false);
                }}
                text={"Удалить изображение?"}
            />
        </Form>
    );
};

export default ClothesProductEdit;