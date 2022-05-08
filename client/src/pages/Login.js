import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {blink} from "../utils/uiUtils";
import {authAndFetchUser} from "../redux/actions";
import {useHistory} from "react-router-dom";
import {MAIN_ROUTE, SELLER_PRODUCTS_ROUTE} from "../utils/consts";
import {MODER, SELLER} from "../utils/roles";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userReducer = useSelector(state => state.userReducer);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (userReducer.userRole === SELLER && userReducer.isAuth) {
            history.push(SELLER_PRODUCTS_ROUTE);
        }
        if (userReducer.userRole === MODER && userReducer.isAuth) {
            history.push(MAIN_ROUTE);
        }
    }, [userReducer.isAuth]);

    const click = async () => {
        let errors = 0;
        if (email.trim().length < 5) {
            blink("email");
            errors++;
        }
        if (password.trim().length < 8) {
            blink("password");
            errors++;
        }
        if (errors === 0) {
            dispatch(authAndFetchUser(email, password, userReducer.userRole));
        }
    };

    return (
        <Container>
            <Form className={"d-flex mt-5 justify-content-center"}>
                <div>
                    <div className={"mt-5 nav-title fs-3 text-uppercase text-center"}>
                        КЛАДОВКА <span className={"text-black opacity-95 text-lowercase"}>{userReducer.userRole.toLowerCase()}</span>
                    </div>
                    <Card className={"border-radius-50 mt-3 p-5"} style={{width: "460px"}}>
                        <Card.Title>Вход</Card.Title>
                        <Form.Control
                            id={"email"}
                            className={"mt-2 mb-2 border-radius-10"}
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
                        <Button variant={"main"} className={"mt-2"} onClick={click}>Войти</Button>
                    </Card>
                </div>
            </Form>
        </Container>
    );
};

export default Login;