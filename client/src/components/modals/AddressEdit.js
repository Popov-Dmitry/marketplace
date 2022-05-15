import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from "../Checkbox";
import {blink} from "../../utils/uiUtils";
import {deleteAddress, saveAddress, setCurrentAddress, updateAddress} from "../../redux/actions";

const AddressEdit = ({show, onHide}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const currentAddress = useSelector(state => state.deliveryReducer.currentAddress);
    const [address, setAddress] = useState("");
    const [index, setIndex] = useState("");
    const [isMain, setIsMain] = useState(false);

    useEffect(() => {
        setAddress(currentAddress !== null ? currentAddress.address : "");
        setIndex(currentAddress !== null ? currentAddress.index : "");
        setIsMain(currentAddress !== null ? currentAddress.isMain : false);
    }, [currentAddress]);

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
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                if (currentAddress !== null) {
                    setTimeout(() => dispatch(setCurrentAddress(null)), 300);
                }
                onHide(false);
            }}
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

                <div className={currentAddress !== null ? "mt-1 d-flex justify-content-between" : ""}>
                    {currentAddress !== null &&
                        <Button
                            variant={"danger"}
                            className={"mt-1 border-radius-10"}
                            onClick={() => {
                                dispatch(deleteAddress(currentAddress.id));
                                setAddress("");
                                setIndex("");
                                setIsMain(false);
                                onHide(false);
                            }}
                        >
                            Удалить
                        </Button>
                    }
                    <Button
                        variant={"main"}
                        className={`mt-1 border-radius-10 ${currentAddress === null && "float-end"}`}
                        onClick={() => {
                            if (!validation()) {
                                return;
                            }
                            if (currentAddress !== null) {
                                dispatch(updateAddress(currentAddress.id, address, index, user.id, isMain));
                            }
                            else {
                                dispatch(saveAddress(address, index, user.id, isMain));
                            }
                            setAddress("");
                            setIndex("");
                            setIsMain(false);
                            onHide(false);
                        }}
                    >
                        Сохранить
                    </Button>
                </div>


            </Modal.Body>
        </Modal>
    );
};

export default AddressEdit;