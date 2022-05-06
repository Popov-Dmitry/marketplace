import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addProductDetails, updateClothesDetails} from "../../redux/actions";
import {blink} from "../../utils/uiUtils";

const ClothesProductDetailsEdit = ({step, setStep, product}) => {
    const dispatch = useDispatch();
    const [brand, setBrand] = useState((product && product.brand) ? product.brand : "");
    const [title, setTitle] = useState((product && product.title) ? product.title : "");
    const [description, setDescription] = useState((product && product.description) ? product.description : "");
    const [composition, setComposition] = useState((product && product.composition) ? product.composition : "");
    const [category, setCategory] = useState((product && product.category) ? product.category : "");
    const [season, setSeason] = useState((product && product.season) ? product.season : "");
    const [type, setType] = useState((product && product.type) ? product.type : "");
    const [productionCountry, setProductionCountry] =
        useState((product && product.productionCountry) ? product.productionCountry : "");
    const [care, setCare] = useState((product && product.care) ? product.care : "");
    const [style, setStyle] = useState((product && product.style) ? product.style : "");

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
            <Form.Label className={"opacity-95"}>Бренд <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"brand"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Бренд"
                value={brand}
                onChange={e => setBrand(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Название товара <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"title"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Название товара"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Описание товара <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"description"}
                className={"mb-2 border-radius-10 w-50 resize-none"}
                as={"textarea"}
                rows={3}
                placeholder="Описание товара"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Состав <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"composition"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Состав"
                value={composition}
                onChange={e => setComposition(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Пол <span className={"text-danger"}>*</span></Form.Label>
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
            <Form.Label className={"opacity-95"}>Сезон <span className={"text-danger"}>*</span></Form.Label>
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
                <option value="WINTER_SPRING">Зима-Весна</option>
                <option value="SPRING_SUMMER">Весна-Лето</option>
                <option value="SUMMER_AUTUMN">Лето-Осень</option>
                <option value="AUTUMN_WINTER">Осень-Зима</option>
                <option value="SPRING_AUTUMN">Весна-Осень</option>
                <option value="AUTUMN_SPRING">Осень-Весна</option>
                <option value="DEMISEASON">Демисезон</option>
                <option value="ANY">Любой</option>
            </Form.Select>
            <Form.Label className={"opacity-95"}>Тип одежды <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"type"}
                className={"border-radius-10 w-50"}
                placeholder="Тип одежды"
                value={type}
                onChange={e => setType(e.target.value)}
            />
            <div className={"mb-2 fw-light fst-italic"}>Например: куртка, футболка, джинсы,...</div>
            <Form.Label className={"opacity-95"}>Стиль одежды</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Стиль одежды"
                value={style}
                onChange={e => setStyle(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Страна производитель</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Страна производитель"
                value={productionCountry}
                onChange={e => setProductionCountry(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>Уход за одеждой</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10 w-50"}
                placeholder="Уход за одеждой"
                value={care}
                onChange={e => setCare(e.target.value)}
            />
            <Button
                variant={"main"}
                className={"mt-2 mb-4"}
                onClick={() => {
                    if (!validation()) {
                        return;
                    }
                    if (product) {
                        dispatch(updateClothesDetails(product.id, brand, title, description, composition, category,
                            season, type, productionCountry, care, style, null));
                    }
                    else {
                        const productDetails = { brand, title, description, composition, category,
                            season, type, productionCountry, care, style }
                        dispatch(addProductDetails(productDetails));
                        setStep(step + 1);
                    }
                }}
            >
                {product ? "Сохранить" : "Продолжить"}
            </Button>
        </div>
    );
};

export default ClothesProductDetailsEdit;