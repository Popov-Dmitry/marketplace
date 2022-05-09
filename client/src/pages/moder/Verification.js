import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchSellerInfo, updateSellerInfo} from "../../redux/actions";
import {blink} from "../../utils/uiUtils";
import {MAIN_ROUTE} from "../../utils/consts";

const Verification = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentInfo = useSelector(state => state.moderReducer.currentInfo);
    const [message, setMessage] = useState("");

    useEffect(() => dispatch(fetchSellerInfo(history.location.pathname.split("/")[2])), []);

    return (
        <Container>
            {currentInfo &&
                <Form className={"fs-5 mt-4 w-50"}>
                    <div>
                        <div className={"fs-4 fw-bold"}>Владелец магазина</div>
                        <div>{currentInfo.firstName} {currentInfo.secondName}</div>
                        <div>Email: {currentInfo.email}</div>
                        <div>ИНН: {currentInfo.inn}</div>
                    </div>
                    <div>
                        <div className={"fs-4 fw-bold mt-4"}>Магазин</div>
                        <div>Id: {currentInfo.id}</div>
                        <div>Название: {currentInfo.shopName}</div>
                        <div>
                            Страна:
                            {currentInfo.country === "Russia" && " Россия"}
                            {currentInfo.country === "Ukraine" && " Украина"}
                            {currentInfo.country === "Belarus" && " Белоруссия"}
                            {currentInfo.country === "Kazakhstan" && " Казахстан"}
                            {currentInfo.country === "Other" && " Другая"}
                        </div>
                        <div>Адрес регистрации: {currentInfo.legalAddress}</div>
                        <div>
                            Тип организации:
                            {currentInfo.organizationType === "IP" && " ИП"}
                            {currentInfo.organizationType === "OOO" && " ООО"}
                            {currentInfo.organizationType === "OAO" && " ОАО"}
                            {currentInfo.organizationType === "OTHER" && " Другой"}
                        </div>
                    </div>
                    <div>
                        <div className={"fs-4 fw-bold mt-4"}>Комментарий продавцу</div>
                        <Form.Control
                            id={"message"}
                            className={"mt-2 border-radius-10 resize-none"}
                            as={"textarea"}
                            rows={3}
                            placeholder="Комментарий продавцу"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                    <div className={"mt-4 d-flex justify-content-between"}>
                        <Button
                            variant={"danger"}
                            onClick={() => {
                                if (message.trim().length > 2) {
                                    dispatch(updateSellerInfo(currentInfo.id, "FAILED", message));
                                    history.push(MAIN_ROUTE);
                                }
                                else {
                                    blink("message");
                                }
                            }}
                        >
                            Отклонить
                        </Button>
                        <Button
                            variant={"main"}
                            onClick={() => {
                                dispatch(updateSellerInfo(currentInfo.id, "COMPLETED", message));
                                history.push(MAIN_ROUTE);
                            }}
                        >
                            Одобрить
                        </Button>
                    </div>
                </Form>
            }
        </Container>
    );
};

export default Verification;