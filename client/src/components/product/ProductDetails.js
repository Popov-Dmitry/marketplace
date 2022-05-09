import React, {useMemo} from 'react';
import {getCurrentClothes} from "../../utils/productUtils";
import {useHistory} from "react-router-dom";

const ProductDetails = ({clothes}) => {
    const history = useHistory();
    const currentClothes = useMemo(() =>
        getCurrentClothes(clothes.clothes, history.location.pathname.split("/")[3]), [clothes]);

    return (
        <div>
            <div className={"fs-3 fw-bold"}>Состав</div>
            <div className={"fs-5"}>{clothes.composition}</div>
            <div className={"fs-3 mt-3 fw-bold"}>Описание</div>
            <div className={"fs-5"}>{clothes.description}</div>
            <div className={"mt-2 mb-3 fs-5"}>
                {clothes.brand && <div><span className={"fw-light"}>Бренд:</span> {clothes.brand} </div>}
                {clothes.type && <div><span className={"fw-light"}>Тип:</span> {clothes.type} </div>}
                {clothes.category && <div><span className={"fw-light"}>Пол:</span> {
                    clothes.category === "MEN" && "Мужчины" ||
                    clothes.category === "WOMEN" && "Женщины" ||
                    clothes.category === "UNISEX" && "Унисекс" ||
                    clothes.category === "BOYS" && "Мальчики" ||
                    clothes.category === "GIRLS" && "Девочки"}</div>}
                {clothes.season && <div><span className={"fw-light"}>Сезон:</span> {
                    clothes.season === "WINTER" && "Зима" ||
                    clothes.season === "SPRING" && "Весна" ||
                    clothes.season === "SUMMER" && "Лето" ||
                    clothes.season === "AUTUMN" && "Осень" ||
                    clothes.season === "DEMISEASON" && "Демисезон" ||
                    clothes.season === "ANY" && "Любой" ||
                    clothes.season === "WINTER_SPRING" && "Зима-Весна" ||
                    clothes.season === "SPRING_SUMMER" && "Весна-Лето" ||
                    clothes.season === "SUMMER_AUTUMN" && "Лето-Осень" ||
                    clothes.season === "AUTUMN_WINTER" && "Осень-Зима" ||
                    clothes.season === "SPRING_AUTUMN" && "Весна-Осень" ||
                    clothes.season === "AUTUMN_SPRING" && "Осень-Весна"}</div>}
                {clothes.care && <div><span className={"fw-light"}>Уход:</span> {clothes.care}</div>}
                {clothes.style && <div><span className={"fw-light"}>Стиль:</span> {clothes.style}</div>}
                {clothes.productionCountry &&
                    <div><span className={"fw-light"}>Страна производитель:</span> {clothes.productionCountry}</div>}
                {currentClothes.color && <div><span className={"fw-light"}>Цвет:</span> {currentClothes.color}</div>}
                {currentClothes.size && <div><span className={"fw-light"}>Размер:</span> {currentClothes.size}</div>}
                {currentClothes.weight && <div><span className={"fw-light"}>Вес:</span> {currentClothes.weight}г</div>}
            </div>
        </div>
    );
};

export default ProductDetails;