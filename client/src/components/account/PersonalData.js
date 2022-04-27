import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "../DatePicker";
import {updateCustomer} from "../../redux/actions";

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
            if (account.user.firstName !== firstName || account.user.secondName !== secondName ||
                account.user.sex !== sex || account.user.birthDay !== birthDay ||
                account.user.birthMonth !== birthMonth || account.user.birthYear !== birthYear) {
                document.getElementById("save").classList.remove("disabled");
            }
            else {
                document.getElementById("save").classList.add("disabled");
            }
        }
    }

    changeChecker();

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
            <Button
                id={"save"}
                variant={"main"}
                className={"mt-2 float-end disabled"}
                onClick={() => dispatch(updateCustomer(account.user.id, firstName, secondName,
                    null, null, sex, birthDay, birthMonth, birthYear))}
            >
                Сохранить
            </Button>
        </Form>
    );
};

export default PersonalData;