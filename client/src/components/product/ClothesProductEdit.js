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

    useEffect(() => {
        setDetailsId(history.location.pathname.split("/")[3]);
        setId(history.location.pathname.split("/")[4]);
    }, [])

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
                            if (e.target.value < 0) {
                                e.target.value = e.target.value * -1;
                            }
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
                            if (e.target.value < 0) {
                                e.target.value = e.target.value * -1;
                            }
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
                    if (e.target.value < 0) {
                        e.target.value = e.target.value * -1;
                    }
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
            <div className={"w-50"}>
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