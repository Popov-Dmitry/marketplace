import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {registrationUser} from "../../redux/actions";
import {SELLER} from "../../utils/roles";
import {blink} from "../../utils/uiUtils";

const Registration = () => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [shopName, setShopName] = useState("");
    const [country, setCountry] = useState("Russia");
    const [organizationType, setOrganizationType] = useState("IP");
    const [inn, setInn] = useState("");
    const [legalAddress, setLegalAddress] = useState("");

    const click = async () => {
        let errors = 0;
        if (step === 1) {
            if (email.trim().length < 5) {
                blink("email");
                errors++;
            }
            if (password.trim().length < 8) {
                blink("password");
                errors++;
            }
            if (passwordConfirmation.trim().length < 8) {
                blink("password-confirmation");
                errors++;
            }
            if (firstName.trim().length < 2) {
                blink("first-name");
                errors++;
            }
            if (secondName.trim().length < 2) {
                blink("second-name");
                errors++;
            }
            if (errors === 0) {
                setStep(step + 1);
            }
        }
        if (step === 2) {
            if (shopName.trim().length < 1) {
                blink("shop-name");
                errors++;
            }
            if (inn.trim().length < 5 || inn.trim().length > 16) {
                blink("inn");
                errors++;
            }
            if (legalAddress.trim().length < 5) {
                blink("legal-address");
                errors++;
            }
            if (errors === 0) {
                const user = { firstName, secondName, email, password, shopName, country, organizationType, inn, legalAddress };
                dispatch(registrationUser(user, SELLER));
            }
        }
    }

    return (
        <Container>
            <Form className={"d-flex mt-5 justify-content-center"}>
                <div>
                    <div className={"mt-5 nav-title fs-3 text-uppercase text-center"}>
                        КЛАДОВКА <span className={"text-black opacity-95 text-lowercase"}>seller</span>
                    </div>
                    <Card className={"border-radius-50 mt-3 p-5"} style={{width: "460px"}}>
                        <Card.Title>Регистрация</Card.Title>
                        {step === 1 &&
                            <div>
                                <Form.Control
                                    id={"first-name"}
                                    className={"mt-2 mb-2 border-radius-10"}
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
                        }
                        {step === 2 &&
                            <div>
                                <Form.Label className={"mt-2"}>Страна магазина</Form.Label>
                                <Form.Select
                                    className={"mb-2 border-radius-10"}
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                >
                                    <option value="Russia">Россия</option>
                                    <option value="Ukraine">Украина</option>
                                    <option value="Belarus">Белоруссия</option>
                                    <option value="Kazakhstan">Казахстан</option>
                                    <option value="Other">Другая</option>
                                </Form.Select>
                                <Form.Control
                                    id={"shop-name"}
                                    className={"mb-2 border-radius-10"}
                                    placeholder="Введите название магазина"
                                    value={shopName}
                                    onChange={e => setShopName(e.target.value)}
                                />
                                <Form.Label>Тип организации</Form.Label>
                                <Form.Select
                                    className={"mb-2 border-radius-10"}
                                    value={organizationType}
                                    onChange={e => setOrganizationType(e.target.value)}
                                >
                                    <option value="IP">ИП</option>
                                    <option value="OOO">ООО</option>
                                    <option value="OAO">ОАО</option>
                                    <option value="OTHER">Другой</option>
                                </Form.Select>
                                <Form.Control
                                    id={"inn"}
                                    className={"mb-2 border-radius-10"}
                                    placeholder="Введите ИНН"
                                    value={inn}
                                    onChange={e => setInn(e.target.value)}
                                />
                                <Form.Control
                                    id={"legal-address"}
                                    className={"mb-2 border-radius-10"}
                                    placeholder="Введите адрес регистрации"
                                    value={legalAddress}
                                    onChange={e => setLegalAddress(e.target.value)}
                                />
                            </div>
                        }
                        <div className={"d-flex justify-content-between"}>
                            <Button variant={"main"} className={`mt-2 ${step === 1 && "disabled"}`} onClick={() => setStep(step - 1)}>
                                Назад
                            </Button>
                            <Button variant={"main"} className={"mt-2"} onClick={click}>
                                {step === 1 && "Далее"}
                                {step === 2 && "Зарегистрироваться"}
                            </Button>
                        </div>
                    </Card>
                </div>
            </Form>
        </Container>
    );
};

export default Registration;