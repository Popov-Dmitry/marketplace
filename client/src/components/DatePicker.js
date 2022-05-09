import React, {useEffect, useMemo, useState} from 'react';
import {FormSelect} from "react-bootstrap";

const months = ['Янв', 'Фев', 'Мар', 'Апр',
    'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт',
    'Ноя', 'Дек'];


const calculateYears = (maxYear) => {
    let years = [];
    let year = maxYear ? maxYear : new Date().getFullYear();
    for(let i = 0; i < 101; i++) {
        years.push(year - i);
    }
    return years;
}

let dayNum;
const calculateDays = (year, month) => {
    if (month === 'Янв' || month === 'Мар' ||
        month === 'Мая' || month === 'Июл' || month === 'Авг'
        || month === 'Окт' || month === 'Дек') {
        dayNum = 31;
    }
    else if (month === 'Апр' || month === 'Июн'
        || month === 'Сен' || month === 'Ноя') {
        dayNum = 30;
    }
    else {
        if (new Date(year, 1, 29).getMonth() === 1) {
            dayNum = 29;
        }
        else {
            dayNum = 28;
        }
    }
    let days = [];
    for (let i = 1; i <= dayNum; i++) {
        days.push(i);
    }
    return days;
}


const DatePicker = ({maxYear, initialDate, onChange}) => {
    const [day, setDay] = useState(initialDate.day ? initialDate.day : 1);
    const [month, setMonth] = useState(initialDate.month ? initialDate.month : 'Янв');
    const [year, setYear] = useState(initialDate.year ? initialDate.year : maxYear ? maxYear : new Date().getFullYear());
    const years = useMemo(() => calculateYears(maxYear), [maxYear]);
    const days = useMemo(() => calculateDays(year, month), [year, month]);

    useEffect(() => {
        if (day > dayNum) {
            setDay(1);
        }
        onChange({day, month, year})
    }, [day, month, year]);

    return (
        <div className="d-flex">
            <FormSelect
                value={day}
                className={"border-radius-10 me-1"}
                onChange={e => setDay(e.target.value)}
            >
                {days.map(d => <option key={d} value={d}>{d}</option>)}
            </FormSelect>
            <FormSelect
                value={month}
                className={"border-radius-10 me-1"}
                onChange={e => setMonth(e.target.value)}
            >
                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
            </FormSelect>
            <FormSelect
                value={year}
                className={"border-radius-10"}
                onChange={e => setYear(e.target.value)}
            >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
            </FormSelect>
        </div>
    );
};

export default DatePicker;