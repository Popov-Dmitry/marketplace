import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "../DatePicker";
import {updateUser} from "../../redux/actions";
import {CUSTOMER, SELLER} from "../../utils/roles";

const PersonalData = () => {
    const dispatch = useDispatch();
    const account = useSelector(state => state.userReducer);
    const [firstName, setFirstName] = useState(account.user.firstName);
    const [secondName, setSecondName] = useState(account.user.secondName);
    const [sex, setSex] = useState(account.user.sex);
    const [birthDay, setBirthDay] = useState(account.user.birthDay);
    const [birthMonth, setBirthMonth] = useState(account.user.birthMonth);
    const [birthYear, setBirthYear] = useState(account.user.birthYear);

    const changeChecker = () => {
        if (document.getElementById("save")) {
            if (account.userRole === CUSTOMER) {
                if (account.user.firstName !== firstName || account.user.secondName !== secondName ||
                    account.user.sex !== sex || account.user.birthDay !== birthDay ||
                    account.user.birthMonth !== birthMonth || account.user.birthYear !== birthYear) {
                    document.getElementById("save").classList.remove("disabled");
                }
                else {
                    document.getElementById("save").classList.add("disabled");
                }
            }
            if (account.userRole === SELLER) {
                if (account.user.firstName !== firstName || account.user.secondName !== secondName) {
                    document.getElementById("save").classList.remove("disabled");
                }
                else {
                    document.getElementById("save").classList.add("disabled");
                }
            }
        }
    };

    changeChecker();

    const onSaveClick = () => {
        let user;
        if (account.userRole === CUSTOMER) {
            user = { id: account.user.id, firstName, secondName, email: null,
                password: null, sex, birthDay, birthMonth, birthYear }
        }
        if (account.userRole === SELLER) {
            user = { id: account.user.id, firstName, secondName, email: null, password: null,
                shopName: null, country: null, organizationType: null, inn: null, legalAddress: null }
        }
        dispatch(updateUser(user, account.userRole))
    }

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Label className={"opacity-95"}>Имя</Form.Label>
                    <Form.Control
                        className={"mb-2 border-radius-10"}
                        placeholder="Имя"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Label className={"opacity-95"}>Фамилия</Form.Label>
                    <Form.Control
                        className={"mb-2 border-radius-10"}
                        placeholder="Фамилия"
                        value={secondName}
                        onChange={e => setSecondName(e.target.value)}
                    />
                </Col>
            </Row>
            {account.userRole === CUSTOMER &&
                <Row>
                    <Col>
                        <Form.Label className={"opacity-95"}>Пол</Form.Label>
                        <Form.Select
                            className={"mb-2 border-radius-10"}
                            value={sex}
                            onChange={e => setSex(e.target.value)}
                        >
                            <option value="MALE">Мужской</option>
                            <option value="FEMALE">Женский</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label className={"opacity-95"}>Дата рождения</Form.Label>
                        <DatePicker
                            maxYear={new Date().getFullYear() - 7}
                            initialDate={{
                                day: birthDay,
                                month: birthMonth,
                                year: birthYear
                            }}
                            onChange={date => {
                                setBirthDay(date.day);
                                setBirthMonth(date.month);
                                setBirthYear(date.year);
                            }}
                        />
                    </Col>
                </Row>
            }
            <Button
                id={"save"}
                variant={"main"}
                className={"mt-2 float-end disabled"}
                onClick={onSaveClick}
            >
                Сохранить
            </Button>
        </Form>
    );
};

export default PersonalData;