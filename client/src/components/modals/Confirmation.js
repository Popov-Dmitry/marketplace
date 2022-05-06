import React from 'react';
import {Button, Modal} from "react-bootstrap";

const Confirmation = ({show, onHide, onCancel, onConfirm, text}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Вы уверены?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"fs-5 text-center mb-3"}>{text}</div>
                <div className={"d-flex justify-content-between"}>
                    <Button variant={"main"} style={{width: "130px"}} onClick={onCancel}>Отменить</Button>
                    <Button variant={"main"} style={{width: "130px"}} onClick={onConfirm}>Подтвердить</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Confirmation;