import React from 'react';

const Checkbox = ({name, checked, onChange, text}) => {
    return (
        <span>
            <input
                type="checkbox"
                className="custom-checkbox"
                id={name}
                name={name}
                value={name}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={name}>{text}</label>
        </span>
    );
};

export default Checkbox;