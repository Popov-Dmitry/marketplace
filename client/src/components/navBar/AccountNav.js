import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {ACCOUNT_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {Image} from "react-bootstrap";
import account from "../../assets/user.png";
import login from "../../assets/login.png";
import {useSelector} from "react-redux";

const AccountNav = () => {
    const history = useHistory();
    const isAuth = useSelector(state => state.userReducer.isAuth);

    return (
        <div>
            {isAuth ?
                <NavLink to={ACCOUNT_ROUTE}>
                    <Image src={account} width="32px" height="32px"/>
                </NavLink>
                :
                <Image
                    src={login}
                    width="32px"
                    height="32px"
                    className={"cursor-pointer"}
                    onClick={() => history.push(LOGIN_ROUTE)}
                />
            }
        </div>
    );
};

export default AccountNav;