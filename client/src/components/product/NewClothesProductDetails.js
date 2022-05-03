import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addProductDetails} from "../../redux/actions";
import {blink} from "../../utils/uiUtils";

const NewClothesProductDetails = ({step, setStep}) => {
    const dispatch = useDispatch();
    const [brand, setBrand] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [composition, setComposition] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [type, setType] = useState("");

    const validation = () => {
        let errors = 0;
        if (brand.trim().length < 1) {
            blink("brand");
            errors++;
        }
        if (title.trim().length < 3) {
            blink("title");
            errors++;
        }
        if (description.trim().length < 5) {
            blink("description");
            errors++;
        }
        if (composition.trim().length < 5) {
            blink("composition");
            errors++
        }
        if (category === "") {
            blink("category");
            errors++
        }
        if (season === "") {
            blink("season");
            errors++
        }
        if (type.trim().length < 1) {
            blink("type");
            errors++
        }
        return errors === 0;
    }

    return (
        <div>
            <Form.Label className={"opacity-95"}>Бренд</Form.Label>
            <Form.Control
                id={"brand"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Бренд"
                value={brand}
                onChange={e => setBrand(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Название товара</Form.Label>
            <Form.Control
                id={"title"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Название товара"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Описание товара</Form.Label>
            <Form.Control
                id={"description"}
                className={"mb-2 border-radius-10 w-50 resize-none"}
                as={"textarea"}
                rows={3}
                placeholder="Описание товара"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Состав</Form.Label>
            <Form.Control
                id={"composition"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Состав"
                value={composition}
                onChange={e => setComposition(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Пол</Form.Label>
            <Form.Select
                id={"category"}
                className={"mb-2 border-radius-10 w-25"}
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option hidden>Пол</option>
                <option value="MEN">Мужчины</option>
                <option value="WOMEN">Женщины</option>
                <option value="UNISEX">Унисекс</option>
                <option value="BOYS">Мальчики</option>
                <option value="GIRLS">Девочки</option>
            </Form.Select>
            <Form.Label className={"opacity-95"}>Сезон</Form.Label>
            <Form.Select
                id={"season"}
                className={"mb-2 border-radius-10 w-25"}
                value={season}
                onChange={e => setSeason(e.target.value)}
            >
                <option hidden>Сезон</option>
                <option value="WINTER">Зима</option>
                <option value="SPRING">Весна</option>
                <option value="SUMMER">Лето</option>
                <option value="AUTUMN">Осень</option>
            </Form.Select>
            <Form.Label className={"opacity-95"}>Тип одежды</Form.Label>
            <Form.Control
                id={"type"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Тип одежды"
                value={type}
                onChange={e => setType(e.target.value)}
            />
            <Button
                variant={"main"}
                className={"mt-2"}
                onClick={() => {
                    if (!validation()) {
                        return;
                    }
                    const productDetails = { brand, title, description, composition, category, season, type }
                    dispatch(addProductDetails(productDetails));
                    setStep(step + 1);
                }}
            >
                Продолжить
            </Button>
        </div>
    );
};

export default NewClothesProductDetails;