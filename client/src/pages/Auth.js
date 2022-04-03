import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory, useLocation, NavLink} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login} from "../http/authApi";
import {fetchCustomerByEmail, registrationCustomer} from "../http/customerApi";
import {authUser, fetchUser} from "../redux/actions";
import {Button, Card, Container, Form} from "react-bootstrap";
import "../styles/App.css";
import ErrorAlert from "../components/ErrorAlert";

const Auth = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [error, setError] = useState("");

    const click = async () => {
        try {
            let resp;
            if (location.pathname === LOGIN_ROUTE) {
                resp = await login(email, password, "CUSTOMER");
                localStorage.setItem("token", resp.headers.authorization.substring(6));
                resp = await fetchCustomerByEmail(email);
            }
            else {
                resp = await registrationCustomer(firstName, secondName, email, password);
            }
                dispatch(fetchUser(resp));
                dispatch(authUser(true));
                history.push(MAIN_ROUTE);
            }
        catch (e) {
            console.log(e);
            if(e.response.status === 401) {
                setError("Неверный email или пароль");
            }
            else {
                setError(e.response.request.response)
            }
            setTimeout(() => setError(""), 4000);
        }
    }

    return (
        <div>
            {error && <ErrorAlert text={error}/>}
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 60}}
            >
                <Card
                    className="p-2 shadow w-75"
                    border={"light"}
                    style={{height: "50%"}}
                >
                    <h2 className="m-auto">{location.pathname === LOGIN_ROUTE ? "Авторизация" : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mb-2"
                            placeholder="Введите email"
                            value={email}
                            inputMode={"email"}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mb-2"
                            placeholder="Введите пароль"
                            value={password}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {location.pathname === LOGIN_ROUTE ?
                            <div/>
                            :
                            <div>
                                {password.trim().length < 8 &&
                                    <div className="fw-light fst-italic mb-2">
                                        Минимальная длина пароля не менее 8 символов
                                    </div>
                                }
                                <Form.Control
                                    className={`mb-2 ${(password === passwordConfirmation || passwordConfirmation.length === 0) ? 
                                        "" : "form-control-error"}`}
                                    placeholder="Повторите пароль"
                                    value={passwordConfirmation}
                                    type="password"
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                />
                                <Form.Control
                                    color={"red"}
                                    className="mb-2"
                                    placeholder="Введите имя"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                <Form.Control
                                    className="mb-2"
                                    placeholder="Введите фамилию"
                                    value={secondName}
                                    onChange={e => setSecondName(e.target.value)}
                                />
                            </div>
                        }
                        <div className="d-flex justify-content-lg-between mt-1">
                            {location.pathname === LOGIN_ROUTE ?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            }
                            <Button
                                onClick={click}
                                variant={"main"}
                            >
                                {location.pathname === LOGIN_ROUTE ? "Войти" : "Зарегистрироваться"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Auth;