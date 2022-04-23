import React from 'react';
import {Button} from "react-bootstrap";
import {deleteCart, updateCart} from "../redux/actions";
import {useDispatch} from "react-redux";

const CountControl = ({item}) => {
    const dispatch = useDispatch();

    return (
        <div>
            <Button
                id={"minus"}
                variant={"light"}
                className={"fs-4 text-black-50 pt-0 pb-0"}
                style={{borderRadius: "100px"}}
                onClick={() => dispatch(updateCart(item.id, item.count - 1))}
            >
                -
            </Button>
            <span className={"ms-2 me-2"}>{item.count}</span>
            <Button
                variant={"light"}
                size={"sm"}
                className={"fs-4 text-black-50 pt-0 pb-0"}
                style={{borderRadius: "100px"}}
                onClick={() => dispatch(updateCart(item.id, item.count + 1))}
            >
                +
            </Button>
            <div>
                <div
                    id={item.id}
                    className={"text-danger text-center cursor-pointer"}
                    onClick={event => dispatch(deleteCart(event.target.id))}
                >
                    Удалить
                </div>
            </div>
        </div>
    );
};

export default CountControl;