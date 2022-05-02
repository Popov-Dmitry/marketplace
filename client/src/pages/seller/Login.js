import React, {useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {blink} from "../../utils/uiUtils";
import {authAndFetchUser} from "../../redux/actions";
import {SELLER} from "../../utils/roles";
import {useHistory} from "react-router-dom";
import {ACCOUNT_PERSONAL_ROUTE} from "../../utils/consts";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            dispatch(authAndFetchUser(email, password, SELLER));
            history.push(ACCOUNT_PERSONAL_ROUTE);
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