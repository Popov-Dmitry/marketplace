import React, {useEffect, useState} from 'react';
import {Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addFilter, fetchSearchClothes, removeFilter} from "../redux/actions";
import Checkbox from "./Checkbox";

let typingTimer;
let doneTypingInterval = 1000;

const SearchPanel = () => {
    const dispatch = useDispatch();
    const searchPanelInfo = useSelector(state => state.clothesReducer.searchPanelInfo);
    const filter = useSelector(state => state.clothesReducer.filter);
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => dispatch(fetchSearchClothes(filter)), [filter]);

    const onSizeChange = (event) => {
        if (event.target.checked) {
            dispatch(addFilter("sizes", event.target.value));
        }
        else {
            dispatch(removeFilter("sizes", event.target.value));
        }
    };

    const onSeasonChange = (event) => {
        if (event.target.checked) {
            dispatch(addFilter("seasons", event.target.value));
        }
        else {
            dispatch(removeFilter("seasons", event.target.value));
        }
    };

    const onSexChange = (event) => {
        if (event.target.checked) {
            dispatch(addFilter("categories", event.target.value));
        }
        else {
            dispatch(removeFilter("categories", event.target.value));
        }
    };

    const onMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
        clearTimeout(typingTimer);
        if (event.target.value && event.target.value > 0) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval, event.target.value);
        }
        else {
            dispatch(removeFilter("price", null));
        }
    };

    const doneTyping = (val) => {
        dispatch(addFilter("price", val));
    };

    return (
        <Row>
            <Form>
                {searchPanelInfo &&
                    <div>
                        <Form.Label className={"fw-bold"}>Категория</Form.Label>
                        <div className={`${searchPanelInfo.types.length > 4 && "panel-scroll"}`}>
                        {searchPanelInfo.types.map(type =>
                            <div key={type}>
                                <Checkbox
                                    value={type}
                                    name={type}
                                    text={type}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            dispatch(addFilter("types", e.target.value));
                                        }
                                        else {
                                            dispatch(removeFilter("types", e.target.value));
                                        }
                                    }}
                                />
                            </div>
                        )}
                        </div>
                    </div>
                }
                {searchPanelInfo &&
                    <div>
                        <Form.Label className={"fw-bold"}>Цвет</Form.Label>
                        <div className={`${searchPanelInfo.colors.length > 4 && "panel-scroll"}`}>
                        {searchPanelInfo.colors.map(color =>
                            <div key={color}>
                                <Checkbox
                                    value={color}
                                    name={color}
                                    text={color}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            dispatch(addFilter("colors", e.target.value));
                                        }
                                        else {
                                            dispatch(removeFilter("colors", e.target.value));
                                        }
                                    }}
                                />
                            </div>
                        )}
                        </div>
                    </div>
                }
                <div>
                    <Form.Label className={"fw-bold"}>Размер</Form.Label>
                    <div className={"panel-scroll"}>
                        <div><Checkbox value={"XXS"} name={"XXS"} text={"XXS"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"XS"} name={"XS"} text={"XS"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"S"} name={"S"} text={"S"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"M"} name={"M"} text={"M"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"L"} name={"L"} text={"L"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"XL"} name={"XL"} text={"XL"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"XXL"} name={"XXL"} text={"XXL"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"XXXL"} name={"XXXL"} text={"XXXL"} onChange={onSizeChange} /></div>
                        <div><Checkbox value={"XXXXL"} name={"XXXXL"} text={"XXXXL"} onChange={onSizeChange} /></div>
                    </div>
                </div>
                <div>
                    <Form.Label className={"fw-bold"}>Цена до</Form.Label>
                    <Form.Control
                        className={"border-radius-10 w-75"}
                        placeholder="До"
                        value={maxPrice}
                        onChange={onMaxPriceChange}
                    />
                </div>
                {searchPanelInfo &&
                    <div>
                        <Form.Label className={"fw-bold"}>Бренд</Form.Label>
                        <div className={`${searchPanelInfo.brands.length > 4 && "panel-scroll"}`}>
                        {searchPanelInfo.brands.map(brand =>
                            <div key={brand}>
                                <Checkbox
                                    value={brand}
                                    name={brand}
                                    text={brand}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            dispatch(addFilter("brands", e.target.value));
                                        }
                                        else {
                                            dispatch(removeFilter("brands", e.target.value));
                                        }
                                    }}
                                />
                            </div>
                        )}
                        </div>
                    </div>
                }
                <div>
                    <Form.Label className={"fw-bold"}>Сезон</Form.Label>
                    <div className={"panel-scroll"}>
                        <div><Checkbox value={"WINTER"} name={"WINTER"} text={"Зима"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"SPRING"} name={"SPRING"} text={"Весна"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"SUMMER"} name={"SUMMER"} text={"Лето"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"AUTUMN"} name={"AUTUMN"} text={"Осень"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"WINTER_SPRING"} name={"WINTER_SPRING"} text={"Зима-Весна"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"SPRING_SUMMER"} name={"SPRING_SUMMER"} text={"Весна-Лето"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"SUMMER_AUTUMN"} name={"SUMMER_AUTUMN"} text={"Лето-Осень"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"AUTUMN_WINTER"} name={"AUTUMN_WINTER"} text={"Осень-Зима"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"SPRING_AUTUMN"} name={"SPRING_AUTUMN"} text={"Весна-Осень"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"AUTUMN_SPRING"} name={"AUTUMN_SPRING"} text={"Осень-Весна"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"DEMISEASON"} name={"DEMISEASON"} text={"Демисезон"} onChange={onSeasonChange} /></div>
                        <div><Checkbox value={"ANY"} name={"ANY"} text={"Любой"} onChange={onSeasonChange} /></div>
                    </div>
                </div>
                <div>
                    <Form.Label className={"fw-bold"}>Пол</Form.Label>
                    <div><Checkbox value={"MEN"} name={"MEN"} text={"Мужчины"} onChange={onSexChange} /></div>
                    <div><Checkbox value={"WOMEN"} name={"WOMEN"} text={"Женщины"} onChange={onSexChange} /></div>
                    <div><Checkbox value={"UNISEX"} name={"UNISEX"} text={"Унисекс"} onChange={onSexChange} /></div>
                    <div><Checkbox value={"BOYS"} name={"BOYS"} text={"Мальчики"} onChange={onSexChange} /></div>
                    <div><Checkbox value={"GIRLS"} name={"GIRLS"} text={"Девочки"} onChange={onSexChange} /></div>
                    {/*<Form.Check type={"checkbox"} value={"MEN"} label={"Мужчины"} name={"categories"} onChange={onChange}/>*/}
                    {/*<Form.Check type={"checkbox"} value={"WOMEN"} label={"Женщины"} name={"categories"} onChange={onChange}/>*/}
                    {/*<Form.Check type={"checkbox"} value={"UNISEX"} label={"Унисекс"} name={"categories"} onChange={onChange}/>*/}
                    {/*<Form.Check type={"checkbox"} value={"BOYS"} label={"Мальчики"} name={"categories"} onChange={onChange}/>*/}
                    {/*<Form.Check type={"checkbox"} value={"GIRLS"} label={"Девочки"} name={"categories"} onChange={onChange}/>*/}
                </div>
            </Form>
        </Row>
    );
};

export default SearchPanel;
