import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveReturn} from "../../redux/actions";

const ReturnProduct = ({show, onHide}) => {
    const dispatch = useDispatch();
    const orderId = useSelector(state => state.returnReducer.currentOrderId);
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Возврат товара
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Причина возврата <span className={"text-danger"}>*</span></Form.Label>
                    <Form.Select
                        id={"reason"}
                        className={"border-radius-10 w-50"}
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                    >
                        <option hidden>Причина возврата</option>
                        <option value={"FIT"}>Товар не подошел</option>
                        <option value={"QUALITY"}>Проблемы с качеством товара</option>
                        <option value={"COUNT"}>Несоответствие количества</option>
                    </Form.Select>
                    <Form.Label className={"mt-2"}>Опишите проблему</Form.Label>
                    <Form.Control
                        className={"border-radius-10 resize-none"}
                        placeholder="Опишите проблему"
                        as={"textarea"}
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Button
                        variant={"main"}
                        className={"mt-3 float-end border-radius-50"}
                        onClick={() => {
                            dispatch(saveReturn(reason, description, orderId));
                            onHide(false);
                        }}
                    >
                        Подтвердить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReturnProduct;