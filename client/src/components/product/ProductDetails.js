import React from 'react';

const ProductDetails = ({clothes}) => {
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
                    clothes.season === "AUTUMN" && "Осень"}</div>}
            </div>
        </div>
    );
};

export default ProductDetails;