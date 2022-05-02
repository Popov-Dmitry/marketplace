import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../http/authApi";
import {showAlert, updateUser} from "../../redux/actions";
import {blink} from "../../utils/uiUtils";
import {CUSTOMER} from "../../utils/roles";

const Security = () => {
    const dispatch = useDispatch();
    const account = useSelector(state => state.userReducer);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [email, setEmail] = useState(account.user.email);

    const checkCurrentPasswordClick = async () => {
        try {
            const resp = await login(account.user.email, currentPassword, "CUSTOMER");
            localStorage.setItem("token", resp.headers.authorization.substring(6));
            setIsConfirmed(true);
        }
        catch (e) {
            console.log(e);
            if(e.response.status === 401) {
                dispatch(showAlert("danger", "Неверный пароль"));
            }
            else {
                dispatch(showAlert("danger", e.response.request.response));
            }
        }
    }

    const saveBtnClick = async () => {
        let errors = 0;
        if (email.trim().length < 5) {
            blink("email");
            errors++;
        }
        if (newPassword.trim().length < 8) {
            blink("password");
            errors++;
        }
        if (newPasswordConfirmation.trim().length < 8) {
            blink("password");
            errors++;
        }
        if (errors === 0) {
            const user = { id: account.user.id, firstName: null, secondName: null, email,
                password: newPassword, sex: null, birthDay: null, birthMonth: null, birthYear: null }
            dispatch(updateUser(user, CUSTOMER));
            setNewPassword("");
            setNewPasswordConfirmation("");
        }
    }

    const changeChecker = () => {
        if (document.getElementById("save")) {
            if (account.user.email !== email ||
                (newPassword && newPasswordConfirmation && newPassword === newPasswordConfirmation)) {
                document.getElementById("save").classList.remove("disabled");
            }
            else {
                document.getElementById("save").classList.add("disabled");
            }
        }
    }

    changeChecker();

    return (
        <div>
            {isConfirmed ?
            <Form>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    className={"border-radius-10 w-50"}
                    placeholder="Email"
                    value={email}
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <Form.Label className={"mt-2"}>Новый пароль</Form.Label>
                <Form.Control
                    className={"border-radius-10 w-50"}
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    type="password"
                    onChange={e => setNewPassword(e.target.value)}
                />
                <Form.Label className={"mt-2"}>Повторите новый пароль</Form.Label>
                <Form.Control
                    className={"border-radius-10 w-50"}
                    placeholder="Повторите новый пароль"
                    value={newPasswordConfirmation}
                    type="password"
                    onChange={e => setNewPasswordConfirmation(e.target.value)}
                />
                <Button
                    id={"save"}
                    variant={"main"}
                    className={"mt-3 disabled"}
                    onClick={saveBtnClick}
                >
                    Сохранить
                </Button>
            </Form>
            :
                <Form className={"d-flex flex-column align-items-center"}>
                    <div className={"fw-bold fs-2"}>
                        Введите пароль
                    </div>
                    <div className={"opacity-75"}>
                        Чтобы продолжить, введите текущий пароль
                    </div>
                    <Form.Control
                        className={"mt-2 border-radius-10 w-50"}
                        placeholder="Пароль"
                        value={currentPassword}
                        type="password"
                        onChange={e => setCurrentPassword(e.target.value)}
                    />
                    <Button
                        variant={"main"}
                        className={"mt-2"}
                        onClick={checkCurrentPasswordClick}
                    >
                        Подтвердить
                    </Button>
                </Form>
            }
        </div>
    );
};

export default Security;