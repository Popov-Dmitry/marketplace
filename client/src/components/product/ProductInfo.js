import React, {useEffect, useMemo} from 'react';
import {Button, Image} from "react-bootstrap";
import favoriteShaded from "../../assets/heart_shaded.png";
import favorite from "../../assets/heart.png";
import {getColorsByDetails, getCurrentClothes, getSizesByColor} from "../../utils/productUtils";
import {useHistory} from "react-router-dom";
import {CLOTHES_ROUTE} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {saveCart} from "../../redux/actions";
import CountControl from "../CountControl";

const ProductInfo = ({clothes}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentClothes = useMemo(() =>
        getCurrentClothes(clothes.clothes, history.location.pathname.split("/")[3]), [clothes]);
    const user = useSelector(state => state.userReducer);
    const cartItem = useSelector(state => state.cartReducer.info);
    const colors = useMemo(() => getColorsByDetails(clothes.clothes), [clothes]);
    const sizes = useMemo(() => getSizesByColor(clothes.clothes, currentClothes.color), [clothes, currentClothes]);

    console.log(currentClothes)

    const addToCartClick = () => {
        if (user.isAuth && user.user.id) {
            dispatch(saveCart(user.user.id, "CLOTHES", clothes.id, currentClothes.id, 1));
        }
        else {
            //TODO: добовлять в локальную корзину и при логине суммировать
        }
    }

    useEffect(() => console.log(cartItem.find(c =>
        c.productDetailsId === clothes.id && c.productId === currentClothes.id)), [cartItem])

    return (
        <div>
            <h3>{clothes.title}</h3>
            {currentClothes.price ?
                <div className={"d-flex"}>
                    <div className={"fs-4 fw-bold"}>{currentClothes.price} &#x20bd;</div>
                    <div className={"ms-2 mt-1 fs-5 opacity-75 fw-bold"}><s>{currentClothes.regularPrice} &#x20bd;</s></div>
                </div>
                :
                <div className={"fs-4 fw-bold"}>{currentClothes.regularPrice} &#x20bd;</div>
            }
            <div>
                <div className={"fs-5"}>Цвета:</div>
                <div className={"mt-3"}>
                    {colors.map(color =>
                        <span
                            key={color}
                            className={`product-item-param product-item-param-border p-2 me-1 fs-6 cursor-pointer
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
                            className={`product-item-param product-item-param-border p-2 me-1 fs-6 cursor-pointer
                            ${size === currentClothes.size && "product-item-param-active-border"}`}
                            onClick={e => history.push(CLOTHES_ROUTE + "/" + clothes.id + "/" +
                                clothes.clothes.find(c =>
                                    c.color === currentClothes.color && c.size === e.target.textContent).id)}
                        >
                            {size}
                        </span>)}
                </div>
            </div>
            <div className={"mt-4 d-flex"}>
                {cartItem.find(c =>
                    c.productDetailsId === clothes.id && c.productId === currentClothes.id) ?
                    <CountControl item={cartItem.find(c =>
                        c.productDetailsId === clothes.id && c.productId === currentClothes.id)}/>
                    :
                    <Button
                        variant={"main"}
                        size={"lg"}
                        className={"w-75 me-2"}
                        onClick={addToCartClick}
                    >
                        Добавить в корзину
                    </Button>
                }
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