import React, {useEffect, useState} from 'react';
import {Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addFilter, fetchSearchClothes, removeFilter} from "../redux/actions";

let typingTimer;
let doneTypingInterval = 1000;

const SearchPanel = () => {
    const dispatch = useDispatch();
    const searchPanelInfo = useSelector(state => state.clothesReducer.searchPanelInfo);
    const filter = useSelector(state => state.clothesReducer.filter);
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => dispatch(fetchSearchClothes(filter)), [filter]);

    const onChange = (event) => {
        if (event.target.checked) {
            dispatch(addFilter(event.target.name, event.target.value));
        }
        else {
            dispatch(removeFilter(event.target.name, event.target.value));
        }
    }

    const onMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
        clearTimeout(typingTimer);
        if (event.target.value && event.target.value > 0) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval, event.target.value);
        }
        else {
            dispatch(removeFilter("price", null));
        }
    }

    const doneTyping = (val) => {
        dispatch(addFilter("price", val));
    }

    return (
        <Row>
            <Form>
                {searchPanelInfo &&
                    <div>
                        <Form.Label className={"fw-bold"}>Категория</Form.Label>
                        <div className={`${searchPanelInfo.types.length > 4 && "panel-scroll"}`}>
                        {searchPanelInfo.types.map(type =>
                            <Form.Check
                                key={type}
                                type={"checkbox"}
                                value={type}
                                label={type}
                                name={"types"}
                                onChange={onChange}
                            />
                        )}
                        </div>
                    </div>
                }
                {searchPanelInfo &&
                    <div>
                        <Form.Label className={"fw-bold"}>Цвет</Form.Label>
                        <div className={`${searchPanelInfo.colors.length > 4 && "panel-scroll"}`}>
                        {searchPanelInfo.colors.map(color =>
                            <Form.Check
                                key={color}
                                type={"checkbox"}
                                value={color}
                                label={color}
                                name={"colors"}
                                onChange={onChange}
                            />
                        )}
                        </div>
                    </div>
                }
                <div>
                    <Form.Label className={"fw-bold"}>Размер</Form.Label>
                    <div className={"panel-scroll"}>
                        <Form.Check type={"checkbox"} value={"XXS"} label={"XXS"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"XS"} label={"XS"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"S"} label={"S"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"M"} label={"M"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"L"} label={"L"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"XL"} label={"XL"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"XXL"} label={"XXL"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"XXXL"} label={"XXXL"} name={"sizes"} onChange={onChange}/>
                        <Form.Check type={"checkbox"} value={"XXXXL"} label={"XXXXL"} name={"sizes"} onChange={onChange}/>
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
                            <Form.Check
                                key={brand}
                                type={"checkbox"}
                                value={brand}
                                label={brand}
                                name={"brands"}
                                onChange={onChange}
                            />
                        )}
                        </div>
                    </div>
                }
                <div>
                    <Form.Label className={"fw-bold"}>Сезон</Form.Label>
                    <Form.Check type={"checkbox"} value={"WINTER"} label={"Зима"} name={"seasons"} onChange={onChange}/>
                    <Form.Check type={"checkbox"} value={"SPRING"} label={"Весна"} name={"seasons"} onChange={onChange}/>
                    <Form.Check type={"checkbox"} value={"SUMMER"} label={"Лето"} name={"seasons"} onChange={onChange}/>
                    <Form.Check type={"checkbox"} value={"AUTUMN"} label={"Осень"} name={"seasons"} onChange={onChange}/>
                </div>
                <div>
                    <Form.Label className={"fw-bold"}>Пол</Form.Label>
                    <Form.Check type={"checkbox"} value={"MEN"} label={"Мужчины"} name={"categories"} onChange={onChange}/>
                    <Form.Check type={"checkbox"} value={"WOMEN"} label={"Женщины"} name={"categories"} onChange={onChange}/>
                    <Form.Check type={"checkbox"} value={"UNISEX"} label={"Унисекс"} name={"categories"} onChange={onChange}/>
                    <Form.Check type={"checkbox"} value={"BOYS"} label={"Мальчики"} name={"categories"} onChange={onChange}/>
                    <Form.Check type={"checkbox"} value={"GIRLS"} label={"Девочки"} name={"categories"} onChange={onChange}/>
                </div>
            </Form>
        </Row>
    );
};

export default SearchPanel;