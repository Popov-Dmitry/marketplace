import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "react-bootstrap";
import Delivery from "../modals/Delivery";
import {fetchDeliveries} from "../../redux/actions";

const DeliveryData = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const deliveries = useSelector(state => state.deliveryReducer.deliveries);
    const [isDeliveryEditVisible, setIsDeliveryEditVisible] = useState(false);

    useEffect(() => dispatch(fetchDeliveries(user.id)), []);

    return (
        <div>
            <div>
                <Button
                    variant={"main"}
                    className={"border-radius-10"}
                    onClick={() => setIsDeliveryEditVisible(true)}
                >
                    Добавить вариант
                </Button>
            </div>
            <div className={"mt-3"}>
                {deliveries.map(delivery =>
                    <Card key={delivery.id} className={"mt-2 border-radius-10 shadow-sm p-2 fs-5 cursor-pointer"}>
                        {delivery.deliveryVariant === "MY" &&
                            <div>
                                <div className={"fw-bold"}>Моя</div>
                                <div>
                                    {delivery.deliveryPriceIncluded ? "Включена в стоимость" : delivery.deliveryPrice}
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
                )}
            </div>

            <Delivery show={isDeliveryEditVisible} onHide={setIsDeliveryEditVisible}/>
        </div>
    );
};

export default DeliveryData;