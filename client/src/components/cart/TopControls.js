import React from 'react';
import {deleteCart, selectItemCart} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const TopControls = ({cart}) => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.cartReducer.selected);

    const selectAll = (event) => {
        for (let c of cart) {
            if (document.getElementById(c.id).checked !== event.target.checked)
            {
                dispatch(selectItemCart(c.id, event.target.checked));
                document.getElementById(c.id).checked = event.target.checked;
            }
        }
    };

    const deleteSelected = () => {
        for (let s of selected) {
            dispatch(deleteCart(s));
        }
    };

    return (
        <div>
            <input
                type="checkbox"
                className="custom-checkbox"
                id={"all"}
                name={"all"}
                value={"all"}
                checked={cart.length === selected.length}
                onChange={selectAll}
            />
            <label htmlFor={"all"}>Выбрать все</label>
            <span
                className={"text-danger float-end cursor-pointer"}
                onClick={deleteSelected}
            >
                Удалить выбранные
            </span>
            <hr/>
        </div>
    );
};

export default TopControls;