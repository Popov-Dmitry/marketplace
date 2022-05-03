import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {addProduct, addProductPhotos} from "../../redux/actions";
import {useDispatch} from "react-redux";

const NewClothesProduct = ({clothesDetailsId = null}) => {
    const dispatch = useDispatch();
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [photos, setPhotos] = useState([]);

    return (
        <Form className={"w-50"}>
            <Form.Label className={"mt-2 opacity-95"}>Цвет</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10"}
                placeholder="Цвет"
                value={color}
                onChange={e => setColor(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Размер</Form.Label>
            <Form.Select
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
            <Form.Label className={"opacity-95"}>Количество</Form.Label>
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
            <Form.Label className={"opacity-95"}>Цена</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10"}
                placeholder="Цена"
                type={"number"}
                value={price}
                onChange={e => {
                    if (e.target.value < 0) {
                        e.target.value = e.target.value * -1;
                    }
                    setPrice(e.target.value);
                }}
            />
            <Form.Label className={"opacity-95"}>Изображения</Form.Label>
            <Form.Control
                id={"files-input"}
                type="file"
                multiple
                onChange={event => setPhotos(event.target.files)}
            />
            <div className={"fw-light fst-italic mt-1"}>
                Загрузите до 5 изображений (каждая до 10МБ) в хорошем качестве.<br/>
                Рекомендованное соотношение сторон 3x4.
            </div>
            <Button
                variant={"main"}
                className={"mt-2"}
                onClick={() => {
                    const product = { color, size, count, price, clothesDetailsId };
                    dispatch(addProduct(product));
                    dispatch(addProductPhotos({...photos}));
                    setColor("");
                    setSize("");
                    setCount(0);
                    setPrice(0);
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
                    const product = { color, size, count, price, clothesDetailsId };
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