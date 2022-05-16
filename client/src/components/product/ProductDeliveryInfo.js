import React from 'react';
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {ACCOUNT_ADDRESSES_ROUTE} from "../../utils/consts";

const ProductDeliveryInfo = () => {
    const delivery = useSelector(state => state.deliveryReducer.currentDelivery);
    const russianPostDelivery = useSelector(state => state.deliveryReducer.russianPostDelivery);

    return (
        <div>
            <div className={"fw-bold"}>Инормация о доставке</div>
            <div>
                {delivery.deliveryVariant === "MY" &&
                    <div>
                        Доставка продавца
                        {delivery.deliveryPriceIncluded ?
                            <span>, <span className={"fst-italic"}>бесплатно</span></span>
                            :
                            <span>, <span className={"fst-italic"}>{delivery.deliveryPrice}</span></span>
                        }
                    </div>
                }
                {delivery.deliveryVariant === "RUSSIAN_POST" &&
                    <div>
                        Доставка Почты России
                        {delivery.deliveryPriceIncluded ?
                            <span>, <span className={"fst-italic"}>бесплатно</span></span>
                            :
                            <span>
                                {delivery.deliveryPriceVariant === "FIXED" &&
                                    <span>, <span className={"fst-italic"}>{delivery.deliveryPrice}</span></span>
                                }
                                {delivery.deliveryPriceVariant === "CALCULATE" && russianPostDelivery !== null &&
                                    russianPostDelivery.hasOwnProperty("paymoneynds") &&
                                    <span> до {russianPostDelivery.delivery.deadline.substring(6, 8)}.
                                        {russianPostDelivery.delivery.deadline.substring(4, 6)},&nbsp;
                                        <span className={"fst-italic"}>
                                            {russianPostDelivery.paymoneynds / 100}  &#x20bd;
                                        </span>
                                    </span>
                                }
                            </span>
                        }
                    </div>
                }
            </div>
            <div><NavLink to={ACCOUNT_ADDRESSES_ROUTE} className={"text-black-50"}>Изменить адрес доставки</NavLink></div>
        </div>
    );
};

export default ProductDeliveryInfo;