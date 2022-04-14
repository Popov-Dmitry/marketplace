import React, {useMemo, useState} from 'react';
import {FormSelect} from "react-bootstrap";

const months = ['Янв', 'Фев', 'Мар', 'Апр',
    'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт',
    'Ноя', 'Дек'];

let years = [];

const calculateYears = () => {
    let year = new Date().getFullYear();
    for(let i = 0; i < 101; i++) {
        years.push(year - i);
    }
}

const calculateDays = (year, month) => {
    let dayNum;
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

calculateYears();


const DatePicker = () => {
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState('Янв');
    const [year, setYear] = useState(2022);
    const days = useMemo(() => calculateDays(year, month), [year, month]);

    return (
        <div className="d-flex">
            <FormSelect
                value={day}
                onChange={e => setDay(e.target.value)}
            >
                {days.map(d => <option key={d} value={d}>{d}</option>)}
            </FormSelect>
            <FormSelect
                value={month}
                onChange={e => setMonth(e.target.value)}
            >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
            </FormSelect>
            <FormSelect
                value={year}
                onChange={e => setYear(e.target.value)}
            >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
            </FormSelect>
        </div>
    );
};

export default DatePicker;