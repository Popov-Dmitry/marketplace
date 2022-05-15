import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from "../Checkbox";
import {blink} from "../../utils/uiUtils";
import {saveAddress} from "../../redux/actions";

const AddressEdit = ({show, onHide}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const [address, setAddress] = useState("");
    const [index, setIndex] = useState("");
    const [isMain, setIsMain] = useState(false);

    const validation = () => {
        let errors = 0;
        if (address.trim().length < 5) {
            blink("address");
            errors++;
        }
        if (index.trim().length < 4 || index.trim().length > 16) {
            blink("index");
            errors++;
        }
        return errors === 0;
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Адрес
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label className={"opacity-95"}>Введите адрес <span className={"text-danger"}>*</span></Form.Label>
                <Form.Control
                    id={"address"}
                    className={"border-radius-10"}
                    placeholder="Например: Россия, г. Новосибирск, ул. Ленина 12, кв. 34"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <Form.Label className={"mt-2 opacity-95"}>Введите индекс <span className={"text-danger"}>*</span></Form.Label>
                <Form.Control
                    id={"index"}
                    className={"border-radius-10"}
                    placeholder="Например: 630099"
                    value={index}
                    onChange={e => setIndex(e.target.value)}
                />
                <div className={"mt-2"}>
                    <Checkbox
                        name={"isMain"}
                        checked={isMain}
                        onChange={e => setIsMain(e.target.checked)}
                        text={"Сделать основным"}
                    />
                </div>

                <Button
                    variant={"main"}
                    className={"mt-1 border-radius-10 float-end"}
                    onClick={() => {
                        if (!validation()) {
                            return;
                        }
                        dispatch(saveAddress(address, index, user.id, isMain));
                    }}
                >
                    Сохранить
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default AddressEdit;