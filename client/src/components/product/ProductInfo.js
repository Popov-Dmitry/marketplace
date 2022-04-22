import React, {useMemo} from 'react';
import {Button, Image} from "react-bootstrap";
import favoriteShaded from "../../assets/heart_shaded.png";
import favorite from "../../assets/heart.png";
import {getColorsByDetails, getSizesByColor} from "../../utils/productUtils";
import {useHistory} from "react-router-dom";
import {CLOTHES_ROUTE} from "../../utils/consts";

const getCurrentClothes = (clothesArr, id) => {
    const currentClothes = clothesArr.filter(c => c.id == id);
    return currentClothes[0] ? currentClothes[0] : {};
}

const ProductInfo = ({clothes}) => {
    const history = useHistory();
    const currentClothes = useMemo(() => getCurrentClothes(clothes.clothes, history.location.pathname.split("/")[3]), [clothes]);
    const colors = useMemo(() => getColorsByDetails(clothes.clothes), [clothes]);
    const sizes = useMemo(() => getSizesByColor(clothes.clothes, currentClothes.color), [clothes, currentClothes]);

    return (
        <div>
            <h3>{clothes.title}</h3>
            <div className={"fs-4 fw-bold"}>{currentClothes.price} &#x20bd;</div>
            <div>
                <div className={"fs-5"}>Цвета:</div>
                <div className={"mt-3"}>
                    {colors.map(color =>
                        <span
                            key={color}
                            className={`product-item-param product-item-param-border p-2 me-1 fs-6 product-item
                            ${color === currentClothes.color && "product-item-param-active-border"}`}
                            onClick={e => history.push(CLOTHES_ROUTE + "/" + clothes.id + "/" +
                                clothes.clothes.find(c => c.color === e.target.textContent).id)}
                        >
                            {color}
                        </span>)}
                </div>
            </div>
            <div>
                <div className={"mt-3 fs-5"}>Размеры:</div>
                <div className={"mt-3"}>
                    {sizes.map(size =>
                        <span
                            key={size}
                            className={`product-item-param product-item-param-border p-2 me-1 fs-6 product-item
                            ${size === currentClothes.size && "product-item-param-active-border"}`}
                            onClick={e => history.push(CLOTHES_ROUTE + "/" + clothes.id + "/" +
                                clothes.clothes.find(c => c.size === e.target.textContent).id)}
                        >
                            {size}
                        </span>)}
                </div>
            </div>
            <div className={"mt-4 d-flex"}>
                <Button variant={"main"} size={"lg"} className={"w-75 me-2"}>Добавить в корзину</Button>
                <Button
                    variant={"light"}
                    size={"lg"}
                    onMouseEnter={(e) => e.target.firstChild.src = favoriteShaded}
                    onMouseLeave={(e) => e.target.firstChild.src = favorite}
                >
                    <Image
                        src={favorite}
                        width="30px"
                        height="30px"
                        className={"black-to-main"}
                    />
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;