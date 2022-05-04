import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {addProduct, addProductPhotos, showAlert} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {blink} from "../../utils/uiUtils";

const NewClothesProduct = () => {
    const dispatch = useDispatch();
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [count, setCount] = useState(0);
    const [regularPrice, setRegularPrice] = useState(0);
    const [weight, setWeight] = useState(0);
    const [photos, setPhotos] = useState([]);

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
        if (photos.length < 1) {
            blink("files-input");
            errors++;
        }
        return errors === 0;
    };

    const onFileChange = (event) => {
        if (event.target.files.length > 5) {
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
        <Form className={"w-50"}>
            <Form.Label className={"mt-2 opacity-95"}>Цвет <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"color"}
                className={"mb-2 border-radius-10"}
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
            <Form.Label className={"opacity-95"}>Количество <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10"}
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
                className={"mb-2 border-radius-10"}
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
            <Form.Label className={"opacity-95"}>Вес, г <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10"}
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
                className={"border-radius-10"}
                type="file"
                accept={"image/jpeg,image/png"}
                multiple
                onChange={onFileChange}
            />
            <div className={"fw-light fst-italic mt-1"}>
                Загрузите до 5 изображений (каждая до 10МБ) в хорошем качестве.<br/>
                Рекомендованное соотношение сторон 3x4.
            </div>
            <Button
                variant={"main"}
                className={"mt-2"}
                onClick={() => {
                    if (!validation()) {
                        return;
                    }
                    const product = { color, size, count, regularPrice, weight };
                    dispatch(addProduct(product));
                    dispatch(addProductPhotos({...photos}));
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
            <Button
                variant={"main"}
                className={"mt-2 float-end"}
                onClick={() => {
                    if (!validation()) {
                        return;
                    }
                    const product = { color, size, count, regularPrice, weight };
                    dispatch(addProduct(product));
                    dispatch(addProductPhotos({...photos}));
                }}
            >
                Завершить
            </Button>
        </Form>
    );
};

export default NewClothesProduct;