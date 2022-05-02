import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {authAndFetchUser, registrationUser} from "../../redux/actions";
import {useDispatch} from "react-redux";
import DatePicker from "../DatePicker";
import {blink} from "../../utils/uiUtils";
import {CUSTOMER} from "../../utils/roles";

const Auth = ({show, onHide}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [sex, setSex] = useState("MALE");
    const [birthDay, setBirthDay] = useState(1);
    const [birthMonth, setBirthMonth] = useState("Янв");
    const [birthYear, setBirthYear] = useState(2000);
    const [isRegistration, setIsRegistration] = useState(false);
    const [registrationStep, setRegistrationStep] = useState(1);

    const click = async () => {
        let errors = 0;
        if (!isRegistration || (isRegistration && registrationStep < 2)) {
            if (email.trim().length < 5) {
                blink("email");
                errors++;
            }
            if (password.trim().length < 8) {
                blink("password");
                errors++;
            }
        }
        if (isRegistration && registrationStep < 2) {
            if (passwordConfirmation.trim().length < 8) {
                blink("password-confirmation");
                errors++;
            }
            if (errors === 0) {
                setRegistrationStep(registrationStep + 1);
            }
        }
        if (isRegistration && registrationStep === 2) {
            if (firstName.trim().length < 2) {
                blink("first-name");
                errors++;
            }
            if (secondName.trim().length < 2) {
                blink("second-name");
                errors++;
            }
        }
        if (errors === 0) {
            if (!isRegistration) {
                dispatch(authAndFetchUser(email, password, "CUSTOMER"));
                onHide();
            }
            else {
                if (registrationStep === 2) {
                    const user = {firstName, secondName, email, password, sex, birthDay, birthMonth, birthYear};
                    dispatch(registrationUser(user, CUSTOMER));
                    onHide();
                }
            }
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {!isRegistration ? "Авторизация" : "Регистрация"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    {(!isRegistration || (isRegistration && registrationStep === 1)) &&
                        <div>
                            <Form.Control
                                id={"email"}
                                className={"mb-2 border-radius-10"}
                                placeholder="Введите email"
                                value={email}
                                inputMode={"email"}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                id={"password"}
                                className={"mb-2 border-radius-10"}
                                placeholder="Введите пароль"
                                value={password}
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    }
                    {isRegistration &&
                        <div>
                            {registrationStep === 1 ?
                                <div>
                                    {password.trim().length < 8 &&
                                        <div className="fw-light fst-italic mb-2">
                                            Минимальная длина пароля не менее 8 символов
                                        </div>
                                    }
                                    <Form.Control
                                        id={"password-confirmation"}
                                        className={`mb-2 border-radius-10 
                                        ${!(password === passwordConfirmation || passwordConfirmation.length === 0) && 
                                        "form-control-error"}`}
                                        placeholder="Повторите пароль"
                                        value={passwordConfirmation}
                                        type="password"
                                        onChange={e => setPasswordConfirmation(e.target.value)}
                                    />
                                </div>
                                :
                                <div>
                                    <Form.Control
                                        id={"first-name"}
                                        color={"red"}
                                        className={"mb-2 border-radius-10"}
                                        placeholder="Введите имя"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                    <Form.Control
                                        id={"second-name"}
                                        className={"mb-2 border-radius-10"}
                                        placeholder="Введите фамилию"
                                        value={secondName}
                                        onChange={e => setSecondName(e.target.value)}
                                    />
                                    <Form.Label className={"opacity-95"}>Пол</Form.Label>
                                    <Form.Select
                                        className={"mb-2 border-radius-10"}
                                        value={sex}
                                        onChange={e => setSex(e.target.value)}
                                    >
                                        <option value="MALE">Мужской</option>
                                        <option value="FEMALE">Женский</option>
                                    </Form.Select>
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
                                </div>
                            }
                        </div>
                    }
                    <div className="d-flex justify-content-lg-between mt-3">
                        {!isRegistration ?
                            <div>
                                Нет аккаунта?&nbsp;
                                <span
                                    className={"green-color text-decoration-underline cursor-pointer"}
                                    onClick={() => setIsRegistration(true)}
                                >
                                    Зарегистрируйся!
                                </span>
                            </div>
                            : registrationStep === 1 ?
                                <div>
                                    Есть аккаунт?&nbsp;
                                    <span
                                        className={"green-color text-decoration-underline cursor-pointer"}
                                        onClick={() => setIsRegistration(false)}
                                    >
                                    Войдите!
                                </span>
                                </div>
                                :
                                <Button
                                    variant={"main"}
                                    onClick={() => setRegistrationStep(registrationStep - 1)}
                                >
                                    Назад
                                </Button>
                        }
                        <Button
                            onClick={click}
                            variant={"main"}
                        >
                            {!isRegistration ? "Войти" : registrationStep < 2 ? "Далее" : "Зарегистрироваться"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Auth;