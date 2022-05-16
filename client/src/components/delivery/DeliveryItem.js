import React from 'react';
import {setCurrentDelivery} from "../../redux/actions";
import {Card} from "react-bootstrap";
import {useDispatch} from "react-redux";

const DeliveryItem = ({delivery, isDeliveryEditVisible, setIsDeliveryEditVisible, deliveryId, setDeliveryId}) => {
    const dispatch = useDispatch();

    return (
        <Card
            id={delivery.id}
            className={`mt-2 border-radius-10 shadow-sm p-2 fs-5 cursor-pointer 
            ${typeof deliveryId != "undefined" && deliveryId === delivery.id && "product-item-param-active-border"}`}
            onClick={() => {
                if (typeof isDeliveryEditVisible != "undefined") {
                    dispatch(setCurrentDelivery(delivery));
                    setIsDeliveryEditVisible(true);
                }
                if (typeof deliveryId != "undefined") {
                    setDeliveryId(delivery.id);
                }
            }}
        >
            {delivery.deliveryVariant === "MY" &&
                <div>
                    <div className={"fw-bold"}>Моя</div>
                    <div>
                        {delivery.deliveryPriceIncluded ? "Включена в стоимость" : <span>{delivery.deliveryPrice} &#x20bd;</span>}
                    </div>
                </div>
            }
            {delivery.deliveryVariant === "RUSSIAN_POST" &&
                <div>
                    <div>
                        <div className={"fw-bold"}>Почта Росии</div>
                        {delivery.deliveryPriceIncluded ? "Включена в стоимость"
                            : delivery.deliveryPriceVariant === "FIXED" ? delivery.deliveryPrice
                                :
                                <div>
                                    <div>Индекс места отправления: {delivery.departureIndex}</div>
                                    <div>
                                        {delivery.returnIndex && `Индекс места вручения возврата: ${delivery.returnIndex}`}
                                    </div>
                                    <div>
                                        Упаковка:
                                        {delivery.packVariant === "10" && " Коробка «S»"}
                                        {delivery.packVariant === "11" && " Пакет полиэтиленовый «S»"}
                                        {delivery.packVariant === "12" && " Конверт с воздушно-пузырчатой пленкой «S»"}
                                        {delivery.packVariant === "20" && " Коробка «M»"}
                                        {delivery.packVariant === "21" && " Пакет полиэтиленовый «M»"}
                                        {delivery.packVariant === "22" && " Конверт с воздушно-пузырчатой пленкой «M»"}
                                        {delivery.packVariant === "30" && " Коробка «L»"}
                                        {delivery.packVariant === "31" && " Пакет полиэтиленовый «L»"}
                                        {delivery.packVariant === "40" && " Коробка «XL»"}
                                        {delivery.packVariant === "41" && " Пакет полиэтиленовый «XL»"}
                                    </div>
                                    <div>
                                        {delivery.service === "41" && "Пакет СМС уведомлений отправителю"}
                                        {delivery.service === "42" && "Пакет СМС уведомлений получателю"}
                                        {delivery.service === "41,42" &&
                                            <div>
                                                <div>Пакет СМС уведомлений отправителю</div>
                                                <div>Пакет СМС уведомлений получателю</div>
                                            </div>
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            }
        </Card>
    );
};

export default DeliveryItem;