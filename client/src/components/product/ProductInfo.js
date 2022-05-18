import React, {useEffect, useMemo} from 'react';
import {Button, Image} from "react-bootstrap";
import favoriteShaded from "../../assets/heart_shaded.png";
import favorite from "../../assets/heart.png";
import {findWish, getColorsByDetails, getCurrentClothes, getSizesByColor} from "../../utils/productUtils";
import {useHistory} from "react-router-dom";
import {CLOTHES_ROUTE} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteWish,
    fetchDelivery,
    fetchMainAddress,
    fetchRussianPostDelivery,
    saveCart,
    saveWish
} from "../../redux/actions";
import CountControl from "../CountControl";
import ProductDeliveryInfo from "./ProductDeliveryInfo";

const ProductInfo = ({clothes}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentClothes = useMemo(() =>
        getCurrentClothes(clothes.clothes, history.location.pathname.split("/")[3]), [clothes]);
    const user = useSelector(state => state.userReducer);
    const cartItem = useSelector(state => state.cartReducer.info);
    const wishlist = useSelector(state => state.wishlistReducer.wishlist);
    const delivery = useSelector(state => state.deliveryReducer.currentDelivery);
    const mainAddress = useSelector(state => state.deliveryReducer.mainAddress);
    const colors = useMemo(() => getColorsByDetails(clothes.clothes), [clothes]);
    const sizes = useMemo(() => getSizesByColor(clothes.clothes, currentClothes.color), [clothes, currentClothes]);
    const wish = useMemo(() => findWish(wishlist, "CLOTHES", clothes.id, currentClothes.id),
        [wishlist, clothes, currentClothes]);

    console.log(wish)
    const addToCartClick = () => {
        if (user.isAuth && user.user.id) {
            dispatch(saveCart(user.user.id, "CLOTHES", clothes.id, currentClothes.id, 1));
        }
        else {
            //TODO: добовлять в локальную корзину и при логине суммировать
        }
    }

    useEffect(() => {
        if(currentClothes.hasOwnProperty("deliveryId")) {
            dispatch(fetchDelivery(currentClothes.deliveryId));
        }
    }, [currentClothes]);

    useEffect(() => {
        if (user.user.hasOwnProperty("id")) {
            dispatch(fetchMainAddress(user.user.id));
        }
    }, [user]);

    useEffect(() => {
        if (delivery !== null && mainAddress !== null && delivery.hasOwnProperty("deliveryVariant") &&
            delivery.hasOwnProperty("deliveryPriceVariant") && mainAddress.hasOwnProperty("index")) {
            if (delivery.deliveryVariant === "RUSSIAN_POST" && delivery.deliveryPriceVariant === "CALCULATE") {
                dispatch(fetchRussianPostDelivery(delivery.departureIndex, mainAddress.index, currentClothes.weight,
                    delivery.packVariant, delivery.returnIndex,
                    currentClothes.price !== null ? currentClothes.price : currentClothes.regularPrice, delivery.service));
            }
        }
    }, [delivery, mainAddress, currentClothes]);

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
                            className={`product-item-param-hover product-item-param-border p-2 me-1 fs-6 cursor-pointer
                            ${color === currentClothes.color && "product-item-param-active-border"}`}
                            onClick={e => history.push(CLOTHES_ROUTE + "/" + clothes.id + "/" +
                                clothes.clothes.find(c => c.color === e.target.textContent && c.count > 0 && c.count > 0).id)}
                        >
                            {color}
                        </span>)}
                </div>
            </div>
            <div>
                <div className={"mt-3 fs-5"}>Размеры:</div>
                <div className={"mt-3"}>
                    {sizes.map(item =>
                        <span
                            key={item.size}
                            className={`product-item-param-hover product-item-param-border p-2 me-1 fs-6 cursor-pointer
                            ${item.size === currentClothes.size && "product-item-param-active-border"} 
                            ${item.count === 0 && "disabled text-black-50"}`}
                            onClick={() =>
                                item.count !== 0 && history.push(CLOTHES_ROUTE + "/" + clothes.id + "/" + item.id)}
                        >
                            {item.size}
                        </span>)}
                </div>
            </div>
            <div className={"mt-4"}>
                {delivery !== null && <ProductDeliveryInfo/>}
            </div>
            <div className={"mt-3 d-flex"}>
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
                    className={cartItem.find(c => c.productDetailsId === clothes.id &&
                        c.productId === currentClothes.id) ? "ms-3 h-75" : ""}
                    onMouseEnter={(e) => {
                        if (typeof wish == "undefined") {
                            e.target.firstChild.src = favoriteShaded;
                        }

                    }}
                    onMouseLeave={(e) => {
                        if (typeof wish == "undefined") {
                            e.target.firstChild.src = favorite;
                        }
                    }}
                    onClick={() => {
                        if (typeof wish == "undefined") {
                            dispatch(saveWish("CLOTHES", clothes.id, currentClothes.id, user.user.id, clothes.sellerId));
                        }
                        else {
                            dispatch(deleteWish(wish.id));
                        }
                    }}
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