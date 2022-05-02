import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {blink} from "../../utils/uiUtils";
import {updateUser} from "../../redux/actions";
import {SELLER} from "../../utils/roles";

const ShopData = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const [shopName, setShopName] = useState(user.shopName);
    const [country, setCountry] = useState(user.country);
    const [organizationType, setOrganizationType] = useState(user.organizationType);
    const [inn, setInn] = useState(user.inn);
    const [legalAddress, setLegalAddress] = useState(user.legalAddress);

    const click = () => {
        let errors = 0;
        if (shopName.trim().length < 1) {
            blink("shop-name");
            errors++;
        }
        if (legalAddress.trim().length < 5) {
            blink("legal-address");
            errors++;
        }
        if (errors === 0) {
            const updatedUser = { id: user.id, firstName: null, secondName: null, email: null,
                password: null, shopName, country, organizationType, legalAddress };
            dispatch(updateUser(updatedUser, SELLER));
        }
    };

    const changeChecker = () => {
        if (document.getElementById("save")) {
            if (user.shopName !== shopName || user.country !== country ||
                user.organizationType !== organizationType || user.legalAddress !== legalAddress) {
                document.getElementById("save").classList.remove("disabled");
            }
            else {
                document.getElementById("save").classList.add("disabled");
            }
        }
    };

    changeChecker();

    return (
        <Form>
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
                placeholder="Название магазина"
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
                disabled
                placeholder="ИНН"
                value={inn}
                onChange={e => setInn(e.target.value)}
            />
            <Form.Control
                id={"legal-address"}
                className={"mb-2 border-radius-10"}
                placeholder="Адрес регистрации"
                value={legalAddress}
                onChange={e => setLegalAddress(e.target.value)}
            />
            <Button
                id={"save"}
                variant={"main"}
                className={"mt-2 float-end disabled"}
                onClick={click}
            >
                Сохранить
            </Button>
        </Form>
    );
};

export default ShopData;